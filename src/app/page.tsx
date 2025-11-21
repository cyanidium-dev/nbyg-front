export default function Home() {
    return (
        <>
            {/* Spacer for fixed header */}
            <div className="h-28"></div>

            {/* Dummy content blocks to test scrollable header */}
            <div className="h-screen w-full bg-red-500 flex items-center justify-center">
                <h1 className="text-white text-4xl">
                    Section 1 - Scroll down to see header change
                </h1>
            </div>
            <div className="h-screen w-full bg-blue-500 flex items-center justify-center">
                <h1 className="text-white text-4xl">Section 2</h1>
            </div>
            <div className="h-screen w-full bg-green-500 flex items-center justify-center">
                <h1 className="text-white text-4xl">Section 3</h1>
            </div>
            <div className="h-screen w-full bg-yellow-500 flex items-center justify-center">
                <h1 className="text-black text-4xl">Section 4</h1>
            </div>
            <div className="h-screen w-full bg-purple-500 flex items-center justify-center">
                <h1 className="text-white text-4xl">Section 5</h1>
            </div>
        </>
    );
}
