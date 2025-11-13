import Image from "next/image";

export default function Home() {
    return (
        <>
            <div className="h-[2000px]">
                <Image
                    src="/images/hero/bgDesk.jpg"
                    alt="Logo"
                    width={1920}
                    height={1080}
                    className="w-full h-[50vh] object-cover"
                />
            </div>
        </>
    );
}
