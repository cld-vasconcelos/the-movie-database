import config from "../../config";
import "./ModelOverview.css";

export default function ModelOverview(props) {
    const model = props.model;
    const details = props.details;
    return (
        <div className="model-overview">
            <div className="model-poster">
                <img
                    src={model.poster_path || model.profile_path ? `${config.imageBaseUrl}${model.poster_path || model.profile_path}` : require("../../assets/images/no-poster.jpeg")}
                    className="model-poster"
                    alt={model.title || model.name}
                />
            </div>
            <div style={{ margin: "0 2rem" }}>
                <div className="model-name">
                    {model.title || model.name}
                </div>
                <div className="model-details">
                    <ul>
                        {details.map((detail) => (
                            <li key={detail.key}>
                                <div className="model-detail-title">
                                    {detail.title}
                                </div>
                                <div className="model-detail-content">
                                    {detail.content}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}