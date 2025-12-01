import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface TableListProps {
  columns: Array<{
    _key?: string;
    title: string;
    values: string[];
  }>;
  uniqueKey?: string;
}

export default function TableList({ columns, uniqueKey }: TableListProps) {
  if (!columns || !columns?.length) return null;

  // Знаходимо максимальну кількість рядків серед усіх колонок
  const maxRows = Math.max(...columns.map((col) => col.values?.length || 0));

  return (
    <motion.div
      key={`${uniqueKey}-table-section-tables-list`}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeInAnimation({ scale: 0.85, delay: 0.3, x: 30 })}
      className="grid shrink-0 h-fit table-list-grid"
      style={
        {
          "--columns-count": columns.length,
          "--rows-count": maxRows,
        } as React.CSSProperties
      }
    >
      {/* Заголовки колонок */}
      {columns.map(({ title }, idx) => (
        <h3
          key={`header-${idx}`}
          className="py-4 lg:py-5 text-[12px] lg:text-[16px] font-medium leading-[167%] lg:leading-[125%] border-b-[0.5px] border-white/10 text-center"
          style={{
            borderRight:
              idx < columns.length - 1
                ? "0.5px solid rgba(255, 255, 255, 0.1)"
                : "none",
          }}
        >
          {title}
        </h3>
      ))}

      {/* Рядки зі значеннями */}
      {Array.from({ length: maxRows }).map((_, rowIdx) =>
        columns.map(({ values }, colIdx) => (
          <div
            key={`cell-${rowIdx}-${colIdx}`}
            className="py-4 lg:py-5 px-5 text-[12px] lg:text-[16px] font-light leading-[167%] lg:leading-[125%] text-center flex items-center justify-center"
            style={{
              borderRight:
                colIdx < columns.length - 1
                  ? "0.5px solid rgba(255, 255, 255, 0.1)"
                  : "none",
              borderBottom:
                rowIdx < maxRows - 1
                  ? "0.5px solid rgba(255, 255, 255, 0.1)"
                  : "none",
            }}
          >
            {values?.[rowIdx] || ""}
          </div>
        ))
      )}
    </motion.div>
  );
}
