interface PhoneCallingIconProps {
    className?: string;
}

export default function PhoneCallingIcon({ className }: PhoneCallingIconProps) {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Phone calling icon"
        >
            <path
                d="M18.668 2.66663C18.668 2.66663 21.6013 2.93329 25.3346 6.66663C29.068 10.4 29.3346 13.3333 29.3346 13.3333"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M18.9414 7.38086C18.9414 7.38086 20.2613 7.75798 22.2412 9.73788C24.2211 11.7178 24.5983 13.0377 24.5983 13.0377"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M13.3822 7.08827L14.2475 8.63884C15.0284 10.0382 14.7149 11.8738 13.485 13.1038C13.485 13.1038 11.9931 14.5957 14.6981 17.3007C17.403 20.0056 18.895 18.5138 18.895 18.5138C20.1249 17.2838 21.9606 16.9703 23.3599 17.7512L24.9105 18.6166C27.0234 19.7958 27.273 22.759 25.4157 24.6163C24.2997 25.7323 22.9326 26.6007 21.4212 26.658C18.8771 26.7544 14.5564 26.1105 10.2223 21.7764C5.8882 17.4423 5.24432 13.1217 5.34077 10.5775C5.39806 9.06617 6.26644 7.69902 7.38244 6.58302C9.2397 4.72575 12.2029 4.97529 13.3822 7.08827Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

