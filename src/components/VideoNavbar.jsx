import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import classes from "./video.module.css";
import app from "../assets/app.png";
import front from "../assets/front.png";
import back from "../assets/back.png";
import ui from "../assets/ui.png";
import video from "../assets/video.png";
const svgDataUrl = (text, bg = "#222") => {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='28'>
        <rect width='100%' height='100%' rx='4' fill='${bg}' />
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-size='12' fill='#fff'>${text}</text>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const OPTIONS = [
    { id: "ui", label: "UI/UX", img: ui },
    { id: "front", label: "Frontend", img: front },
    { id: "back", label: "Backend", img: back },
    { id: "video", label: "Video", img: video },
    { id: "app", label: "App", img: app },
];

export default function VideoNavbar() {
    const location = useLocation();

    const [selected, setSelected] = useState(OPTIONS[0]);
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const category = location.state?.category;
        if (category) {
            const match = OPTIONS.find(opt => opt.label === category);
            if (match) setSelected(match);
        }
    }, [location.state]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <div className={classes.navbar}>
                <div className={classes.brand}>DVM</div>

                <div className={classes.right}>
                    <div ref={containerRef} className={classes.dropdown}>
                        <button
                            onClick={() => setOpen(v => !v)}
                            className={classes.toggleButton}
                        >
                            <img src={selected.img} alt={selected.label} className={classes.optionImg} />
                            <span className={classes.optionLabel}>{selected.label}</span>
                            <span className={classes.caret}>{open ? "▲" : "▼"}</span>
                        </button>

                        {open && (
                            <ul className={classes.optionsList}>
                                {OPTIONS.map(opt => (
                                    <li
                                        key={opt.id}
                                        onClick={() => {
                                            setSelected(opt);
                                            setOpen(false);
                                        }}
                                        className={`${classes.optionItem} ${selected.id === opt.id ? classes.optionItemActive : ""
                                            }`}
                                    >
                                        <img src={opt.img} alt={opt.label} className={classes.optionImg} />
                                        <span className={classes.optionLabel}>{opt.label}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>


            <div className={classes.pageContainer}>
                <div>
                    <h1 className={classes.heading}>{selected.label}</h1>
                </div>
            </div>
        </>
    );
}