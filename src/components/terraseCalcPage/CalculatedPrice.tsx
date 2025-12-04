interface CalculatedPriceProps {
    total: number;
}

export default function CalculatedPrice({ total }: CalculatedPriceProps) {
    if (total <= 0) return null;

    return (
        <section className="max-w-[360px] w-auto px-4 mx-auto sm:max-w-full sm:px-8 lg:max-w-[1040px] lg:px-10 mb-6">
            <div className="rounded-lg bg-white/10 p-4 lg:flex lg:items-center lg:justify-between">
                <h2 className="text-[20px] lg:text-[24px] leading-[125%] font-find-sans-pro font-light pb-4 border-b border-white/10 lg:border-b-0 lg:pb-0 lg:p-0">
                    Forventet pris for din terrasse:
                </h2>
                <p className="pt-4 text-right text-[12px] font-medium leading-[125%] lg:pt-0 lg:p-0">
                    ca. {total.toLocaleString()} kr.
                </p>
            </div>
        </section>
    );
}
