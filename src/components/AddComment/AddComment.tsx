import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './AddComment.module.scss';
import { Emoji } from '../Assets/Emoji';
import { Button } from '../Button/Button';
import Avatar from '../Assets/Avatar';
import useAuthStore from '../../stores/auth.store';
import { useMutationPostComment } from '../../hooks/useMutationComment';
import { EMovieSort } from '../../enums';
import AuthProvider from '../AuthProvider/AuthProvider';

const cx = classNames.bind(styles);

function AddComment({
    episode_id,
    parent_id,
    reply_id,
    reply_profile_id,
    reply_first_name,
    reply_last_name,
    onFocus = false,
    onCancel,
    onSuccess,
    sort_comment,
}: {
    episode_id: string;
    parent_id?: string;
    reply_id?: string;
    reply_profile_id?: string;
    reply_first_name?: string;
    reply_last_name?: string;
    onFocus?: boolean;
    onCancel?: () => void;
    onSuccess?: () => void;
    sort_comment: EMovieSort;
}) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const [text, setText] = useState('');
    const [focusInput, setFocusInput] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showActions, setShowActions] = useState(false);

    const { authuser, list_account } = useAuthStore();

    const emojiList = [
        '😀',
        '😆',
        '😂ིྀ',
        '🤣',
        '😍',
        '🥰',
        '😎',
        '😢',
        '😭ྀིྀི',
        '😌ྀིྀི',
        '😮ྀིྀི',
        '😡',
        '🙄ྀིྀི',
        '👍',
        '👎',
        '🔥',
        '💀',
        '💯',
        '👏',
        '🥺',
        '🙌',
        '🥳',
        '😜',
        '👀',
        '🤩',
        '😱',
        '😳',
        '😅',
        '😎',
        '🌝',
        '🌚',
        '🙈',
        '🙉',
        '🙊',
        '👁️',
        '🤯',
        '🦄',
    ];

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = '20px';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    }, []);

    useEffect(() => {
        if (onFocus && textareaRef.current) {
            textareaRef.current.focus();
            setShowActions(true);
        }
    }, [onFocus]);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = '20px';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    };

    const handleEmojiSelect = (emojiObject: { emoji: string }) => {
        if (textareaRef.current) {
            const cursorPosition = textareaRef.current.selectionStart;

            setText((prev) => {
                const newText = prev.slice(0, cursorPosition) + emojiObject.emoji + prev.slice(cursorPosition);
                return newText;
            });

            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.selectionStart = textareaRef.current.selectionEnd = cursorPosition + emojiObject.emoji.length;
                    textareaRef.current.focus();
                }
            }, 0);
        }
    };

    useEffect(() => {
        if (!showEmojiPicker) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showEmojiPicker]);

    const { postComment } = useMutationPostComment(
        {
            reply_first_name: reply_first_name,
            reply_last_name: reply_last_name,
            reply_profile_id: reply_profile_id,
        },
        [
            ['comments', 'episode', episode_id, sort_comment],
            ['comments', 'child', parent_id, sort_comment],
        ],
        onSuccess
    );

    const handlePostComment = () => {
        postComment({
            episode_id,
            text: text,
            parent_id,
            reply_id: reply_id ? reply_id : undefined,
            reply_profile_id: reply_profile_id ? reply_profile_id : undefined,
        });

        // Reset UI sau khi post
        setText('');
        setShowEmojiPicker(false);
        setShowActions(false);
        if (textareaRef.current) textareaRef.current.style.height = '20px';
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const textarea = textareaRef.current;
        if (textarea) {
            const cursorPosition = textarea.selectionStart;
            const tagRegex = /@([a-zA-Z]+(?:\s[a-zA-Z]+)?)$/; // RegEx để tìm tag dạng @name hoặc @first last
            const match = text.slice(0, cursorPosition).match(tagRegex);

            if (match && e.key === 'Backspace') {
                // Nếu người dùng nhấn Backspace trong phần tag, xoá tag
                setText((prevText) => prevText.slice(0, match.index));
                e.preventDefault(); // Ngừng hành động mặc định của backspace
            }
        }
    };

    return (
        <div className={cx('addCommentContainer')}>
            <Avatar className={cx('addCommentContainer__avatar')} src={list_account[authuser ?? -1]?.img} width="50px" borderRadius="10px" marginLeft="0" marginRight="15px" />
            <div className={cx('addCommentContainer__content')}>
                <div className={cx('addCommentContainer__content__input')}>
                    <textarea
                        ref={textareaRef}
                        value={text}
                        placeholder="Add a comment..."
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        onFocus={() => {
                            setFocusInput(true);
                            setShowActions(true);
                        }}
                        onBlur={() => setFocusInput(false)}
                    />
                    <div className={cx('addCommentContainer__content__driving')}>
                        <div className={cx('addCommentContainer__content__driving__unfocus')}></div>
                        <div className={cx('addCommentContainer__content__driving__focus', { active: focusInput })}></div>
                    </div>
                </div>
                {showActions && (
                    <div className={cx('addCommentContainer__content__actions')}>
                        <div className={cx('addCommentContainer__content__actions__emoji')} ref={emojiPickerRef}>
                            <Button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                                <Emoji width="24px" />
                            </Button>
                            <div className={cx('addCommentContainer__content__actions__emoji__container')}>
                                {showEmojiPicker && (
                                    <div className={cx('addCommentContainer__content__actions__emoji__table')}>
                                        {emojiList.map((emoji, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleEmojiSelect({ emoji })}
                                                style={{
                                                    fontSize: '20px',
                                                    padding: '5px',
                                                    margin: '2px',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                }}
                                                className={cx('emojiButton')}
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={cx('addCommentContainer__content__actions__btn')}>
                            <Button
                                padding
                                rounded
                                hover
                                onClick={() => {
                                    setText('');
                                    setShowEmojiPicker(false);
                                    setShowActions(false);
                                    if (textareaRef.current) textareaRef.current.style.height = '20px';
                                    if (onCancel) onCancel();
                                }}
                            >
                                Cancel
                            </Button>
                            <AuthProvider>
                                <Button
                                    primary
                                    padding
                                    rounded
                                    disabled={text.length <= 0 ? true : false}
                                    onClick={() => {
                                        handlePostComment();
                                    }}
                                >
                                    {!onFocus ? 'Comment' : 'Reply'}
                                </Button>
                            </AuthProvider>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddComment;
