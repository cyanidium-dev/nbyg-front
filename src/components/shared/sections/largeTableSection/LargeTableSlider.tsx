"use client";

import TableList from "../tableSection/TableList";
import SwiperWrapper from "../../swiper/SwiperWrapper";
import { SwiperSlide } from "swiper/react";

interface LargeTableSliderProps {
  columns: Array<{
    _key?: string;
    title: string;
    values: string[];
  }>;
  uniqueKey?: string;
}

const LargeTableSlider = ({ columns, uniqueKey }: LargeTableSliderProps) => {
  return (
    <div className="lg:hidden">
      <SwiperWrapper
        loop
        breakpoints={{
          0: {
            spaceBetween: 16,
            slidesPerView: 1,
          },
        }}
        swiperClassName="large-table-slider"
      >
        <SwiperSlide>
          <TableList
            columns={columns.slice(0, 2)}
            uniqueKey={`${uniqueKey}-table-1`}
          />
        </SwiperSlide>
        <SwiperSlide>
          <TableList
            columns={columns.slice(2, 4)}
            uniqueKey={`${uniqueKey}-table-2`}
          />
        </SwiperSlide>
      </SwiperWrapper>
    </div>
  );
};

export default LargeTableSlider;
