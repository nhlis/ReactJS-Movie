import React from 'react';
import useAuthStore from '../../stores/auth.store';

function AuthProvider({ children, fallback, onAuth }: { children: React.ReactElement; fallback?: () => void; onAuth?: () => void }) {
    const { is_login, setAuthStore } = useAuthStore();

    // Recursively clone and modify all children with onClick handlers
    const cloneWithAuthCheck = (element: React.ReactElement): React.ReactElement => {
        if (!React.isValidElement(element)) {
            return element;
        }

        const childProps = { ...(element.props as Record<string, any>) };

        const originalOnClick = childProps.onClick;

        childProps.onClick = (e: React.MouseEvent) => {
            if (!is_login) {
                e.preventDefault();
                e.stopPropagation();
                fallback?.() ?? setAuthStore({ is_modal: true });
                return false;
            }
            if (typeof originalOnClick === 'function') {
                originalOnClick(e);
            }
            onAuth?.();
        };

        // Process children recursively (giữ nguyên)
        if (childProps.children) {
            if (React.isValidElement(childProps.children)) {
                childProps.children = cloneWithAuthCheck(childProps.children);
            } else if (Array.isArray(childProps.children)) {
                childProps.children = React.Children.map(childProps.children, (child) => {
                    if (React.isValidElement(child)) {
                        return cloneWithAuthCheck(child);
                    }
                    return child;
                });
            }
        }

        return React.cloneElement(element, childProps);
    };

    return cloneWithAuthCheck(children);
}

export default AuthProvider;
