interface CalculatedPriceProps {
    total: number;
}

export default function CalculatedPrice({ total }: CalculatedPriceProps) {
    if (total <= 0) return null;

    return (
        <section className="w-full border-t border-white/10 py-6 pb-8 lg:py-12 lg:pb-10 lg:pt-0">
            <div className="max-w-[360px] w-auto px-4 mx-auto sm:max-w-full sm:px-8 lg:max-w-[1040px] lg:px-10">
                <div className="rounded-lg bg-white/10 p-4 lg:flex lg:items-center lg:justify-between">
                    <h2 className="pb-3 font-serif text-2xl leading-[41px] tracking-[-0.005em] border-b border-white/10 lg:border-b-0 lg:pb-0 lg:p-0">
                        Forventet pris for din terrasse:
                    </h2>
                    <p className="pt-4 text-right text-lg font-bold leading-[22px] tracking-[0.02em] border-t border-white/10 lg:border-t-0 lg:pt-0 lg:p-0">
                        ca. {total.toLocaleString()} kr.
                    </p>
                </div>
            </div>
        </section>
    );
}
