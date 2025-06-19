import type ITextContainer from "./ITextContainer";
import './TextContainer.scss';

export default function TextContainer({ title, subtitle } : ITextContainer) {
  return (
    <div className="text-container">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  )
}