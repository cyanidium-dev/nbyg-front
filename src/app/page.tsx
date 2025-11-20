import Image from "next/image";
export default function Home() {
    return (
        <>
            <Image
                src="/images/hero/bg.png"
                alt="bg"
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
            />
        </>
    );
}
