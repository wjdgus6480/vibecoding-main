import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TagInput } from './TagInput';
import { MAX_TAGS } from '../utils/tags';

// TagInput은 controlled 컴포넌트라 상태를 가진 래퍼로 감싸서 테스트한다
function Harness({ initial = [] }: { initial?: string[] }) {
  const [tags, setTags] = useState(initial);
  const [draft, setDraft] = useState('');
  return <TagInput tags={tags} draft={draft} onTagsChange={setTags} onDraftChange={setDraft} />;
}

const getInput = () => screen.getByLabelText('태그 입력') as HTMLInputElement;
const getTagNames = () =>
  screen
    .queryAllByRole('button', { name: /^태그 삭제: / })
    .map((b) => b.getAttribute('aria-label')!.replace('태그 삭제: ', ''));

describe('TagInput', () => {
  it('Enter로 태그를 추가하고 입력창을 비운다', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.type(getInput(), ' #React {Enter}');

    expect(getTagNames()).toEqual(['React']);
    expect(getInput().value).toBe('');
  });

  it('쉼표로 태그를 추가한다', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.type(getInput(), 'react,vue,');

    expect(getTagNames()).toEqual(['react', 'vue']);
    expect(getInput().value).toBe('');
  });

  it('쉼표가 든 텍스트를 붙여넣으면 각각 추가한다', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(getInput());
    await user.paste('a, b, c');

    expect(getTagNames()).toEqual(['a', 'b', 'c']);
  });

  it('중복이면 추가하지 않고 메시지를 표시하며 입력값은 남긴다', async () => {
    const user = userEvent.setup();
    render(<Harness initial={['React']} />);

    await user.type(getInput(), 'react{Enter}');

    expect(getTagNames()).toEqual(['React']);
    expect(screen.getByText('이미 있는 태그예요')).toBeInTheDocument();
    expect(getInput().value).toBe('react');

    // 다시 입력하면 메시지가 사라진다
    await user.type(getInput(), 's');
    expect(screen.queryByText('이미 있는 태그예요')).not.toBeInTheDocument();
  });

  it('× 버튼으로 태그를 삭제한다', async () => {
    const user = userEvent.setup();
    render(<Harness initial={['React', 'Vue']} />);

    await user.click(screen.getByRole('button', { name: '태그 삭제: React' }));

    expect(getTagNames()).toEqual(['Vue']);
  });

  it('입력창이 비어 있을 때 Backspace로 마지막 태그를 삭제한다', async () => {
    const user = userEvent.setup();
    render(<Harness initial={['React', 'Vue']} />);

    await user.click(getInput());
    await user.keyboard('{Backspace}');

    expect(getTagNames()).toEqual(['React']);
  });

  it('한글 조합 중 Enter는 무시한다', () => {
    render(<Harness />);
    const input = getInput();

    fireEvent.change(input, { target: { value: '공부' } });
    fireEvent.keyDown(input, { key: 'Enter', isComposing: true });
    expect(getTagNames()).toEqual([]);

    fireEvent.keyDown(input, { key: 'Enter', keyCode: 229 });
    expect(getTagNames()).toEqual([]);

    fireEvent.keyDown(input, { key: 'Enter' });
    expect(getTagNames()).toEqual(['공부']);
  });

  it(`${MAX_TAGS}개가 차면 입력창을 비활성화한다`, () => {
    const full = Array.from({ length: MAX_TAGS }, (_, i) => `tag${i}`);
    render(<Harness initial={full} />);

    expect(getInput()).toBeDisabled();
    expect(getInput().placeholder).toBe(`태그는 최대 ${MAX_TAGS}개까지`);
  });
});
