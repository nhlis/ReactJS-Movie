import { EColor } from '../../enums';

function Notification({
    className,
    width = '20px',
    fill = EColor.PREMIUM_COLOR,
    marginLeft,
    marginRight,
}: {
    className?: string;
    width?: string;
    fill?: EColor;
    marginLeft?: string;
    marginRight?: string;
}) {
    return (
        <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width, height: '100%', marginLeft, marginRight }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={fill} width={'100%'} className={className}>
                <path d="M14.223 5.143c2.325 0 3.539 3.32 3.539 6.568 0 3.248-1.215 6.548-3.58 6.516a2.307 2.307 0 01-.745-.132h-.063l-1.35-.48-2.638 2.195-6.281-2.195v-3.157l-.838-.296-.026-.013C2.064 14.055 1 13.42 1 11.73 1 9.886 2.268 9.23 2.268 9.23l.136-.062 10.972-3.902h.104a2.21 2.21 0 01.744-.122h-.001zm-9.025 10.01v1.021l3.717 1.328.859-.684-4.576-1.665zm8.952-7.956c-.388 0-1.434 1.553-1.434 4.514 0 2.961 1.068 4.514 1.435 4.514l.073-.01.042-.005c.426-.102 1.402-1.63 1.402-4.499 0-2.973-1.132-4.515-1.518-4.515v.001zm-2.963 1.051l-7.936 2.788c-.029.04-.15.233-.15.694 0 .514.171.624.171.624l7.915 2.799-.117-.421a11.859 11.859 0 01-.375-3.02 11.831 11.831 0 01.492-3.464zm7.99 9.103l2.825 3.037-1.415 1.517-2.823-3.036 1.412-1.52v.002zM23 10.88v2.147h-3.996V10.88H23zM20.586 2L22 3.519l-2.826 3.037-1.412-1.519L20.586 2z"></path>
            </svg>
        </div>
    );
}

export default Notification;
