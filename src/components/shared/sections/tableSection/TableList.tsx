interface TableListProps {
  columns: Array<{
    _key?: string;
    title: string;
    values: string[];
  }>;
}

export default function TableList({ columns }: TableListProps) {
  if (!columns || !columns?.length) return null;

  return (
    <ul className="flex shrink-0 h-fit">
      {columns.map(({ title, values }, idx) => (
        <li
          key={idx}
          className="flex-1 not-last:border-r-[0.5px] border-white/10 text-center xl:min-w-[178px]"
        >
          <h3 className="py-4 lg:py-5 text-[12px] lg:text-[16px] font-medium leading-[167%] border-b-[0.5px] border-white/10">
            {title}
          </h3>
          <ul className="flex flex-col">
            {values?.map((value, idx) => (
              <li
                key={idx}
                className="py-4 lg:py-5 text-[12px] lg:text-[16px] font-light leading-[167%] not-last:border-b-[0.5px] border-white/10"
              >
                {value}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
