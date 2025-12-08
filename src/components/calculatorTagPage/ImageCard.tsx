"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "@/components/shared/modals/Modal";
import Backdrop from "@/components/shared/backdrop/Backdrop";
import { createPortal } from "react-dom";

interface ImageCardProps {
    id: string;
    label: string;
    image: {
        link: string;
        priority?: boolean;
    };
}

export default function ImageCard({ id, label, image }: ImageCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsMounted(true);
        }, 0);
    }, []);

    const handleImageClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <label
                htmlFor={id}
                className="group flex flex-col h-full cursor-pointer rounded-lg transition duration-250 ease-in-out hover:bg-white/10"
                onClick={handleImageClick}
            >
                <div className="relative mb-1 xl:mb-2 aspect-square w-full overflow-hidden rounded-[4px] lg:rounded-[12px]">
                    <Image
                        src={image.link}
                        alt={id}
                        fill
                        className="object-cover"
                        priority={image.priority}
                    />
                </div>
                <div className="flex grow items-center gap-2 p-[6px] xl:p-2 lg:px-2 lg:py-2 min-h-[43px]">
                    <span className="text-[12px] leading-[150%] xs:text-[18px] md:text-[12px] lg:text-[18px]">
                        {label}
                    </span>
                </div>
            </label>
            {isMounted &&
                createPortal(
                    <>
                        <Backdrop
                            isVisible={isModalOpen}
                            onClick={handleCloseModal}
                        />
                        <Modal
                            isModalShown={isModalOpen}
                            setIsModalShown={value =>
                                !value && handleCloseModal()
                            }
                            className="w-fit max-w-[95vw] max-h-[95vh] h-fit flex items-center justify-center"
                            closeButtonClassName="text-black"
                        >
                            <div
                                className="relative aspect-square flex items-center justify-center overflow-hidden"
                                style={{
                                    width: "min(95vw, 95vh, 800px)",
                                    maxHeight: "95vh",
                                }}
                            >
                                <Image
                                    src={image.link}
                                    alt={label}
                                    fill
                                    className="object-contain rounded-[8px]"
                                    sizes="(max-width: 768px) 95vw, 800px"
                                />
                            </div>
                        </Modal>
                    </>,
                    document.body
                )}
        </>
    );
}
