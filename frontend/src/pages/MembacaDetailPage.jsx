import { useParams } from "react-router-dom";
import DetailProvince from "../components/DetailProvince";

export default function MembacaDetailPage() {
  const { slug } = useParams();

  return <DetailProvince slug={slug} />;
}
