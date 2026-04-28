import classes from "./selection.module.css";
import app from "../assets/app.png";
import front from "../assets/front.png";
import back from "../assets/back.png";
import ui from "../assets/ui.png";
import video from "../assets/video.png";
import { useNavigate } from "react-router-dom";

export default function Selection() {
    const navigate = useNavigate();

    const items = [
        { img: ui, title: "UI/UX", route: "/video" },
        { img: front, title: "Frontend", route: "/video" },
        { img: back, title: "Backend", route: "/video" },
        { img: video, title: "Video", route: "/video" },
        { img: app, title: "App", route: "/video" }
    ];

    const handleClick = (item) => {
        navigate(item.route, { state: { category: item.title } });
    };

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <h1 className={classes.title}>Who's working?</h1>

                <div className={classes.cards}>
                    {items.map((item, i) => {
                        const isUI = i === 0;

                        return (
                            <div key={i} className={classes.card}>
                                <button
                                    className={classes.cardBtn}
                                    onClick={() => handleClick(item)}
                                >
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className={`${classes.cardImg} ${isUI ? classes.uiFix : ""}`}
                                    />
                                </button>

                                <span className={classes.label}>
                                    {item.title}
                                </span>
                            </div>
                        );
                    })}

                    <div className={classes.addProfile}>
                        <button className={classes.addBtn}>
                            <span className={classes.plus}>+</span>
                        </button>

                        <span className={classes.addText}>
                            Add Profile
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}