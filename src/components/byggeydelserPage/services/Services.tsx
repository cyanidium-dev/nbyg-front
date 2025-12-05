import ServiceSection from "./ServiceSection";
import { servicesList } from "./servicesList";

export default function Services() {
  return (
    <>
      {servicesList.map((service, idx) => (
        <ServiceSection key={idx} service={service} />
      ))}
    </>
  );
}
