const { useState, useEffect, useRef } = React;
const h = React.createElement;   // h("div", {className:"x"}, "text") builds an element

const DATA = {
    name: "Vishwa",
    roles: ["Python Full Stack Developer", "Django + React Builder", "Clean-code Enthusiast"],
    intro: "I build fast, accessible web apps from database to interface. Based in Puducherry, I enjoy turning real-world ideas into working products with Python, Django and React.",                                 // <- put your real email
    github: "https://github.com/vishwaanbu73-ux",
    linkedin: "https://www.linkedin.com/in/vishwa-anbu-955778383", // <- https:// added
    resume: "Resume.pdf",                                          // <- must match your PDF file name
    photo: "vish.jpeg",
    email: "vishwaanbu73@gmail.com",                                       // <- must match your image file name
    skills: {
        Frontend: [
            { name: "HTML5", topics: ["Semantic tags", "Forms and inputs", "Tables and lists", "Images, audio and video", "Accessibility basics"] },
            { name: "CSS3", topics: ["Selectors and specificity", "Box model", "Flexbox", "Grid", "Media queries", "Animations and transitions", "CSS variables"] },
            { name: "JavaScript", topics: ["Variables, functions and ES6", "DOM manipulation", "Events", "Array methods (map, filter)", "Fetch API and async/await", "Local storage"] },
            { name: "React.js", topics: ["Components and props", "useState and useEffect", "Lists and keys", "Conditional rendering", "Calling APIs", "Component-based project structure"] },
            { name: "Responsive Design", topics: ["Mobile-first approach", "Fluid layouts and units", "Breakpoints", "Viewport meta tag", "Testing on different screen sizes"] }
        ],
        Backend: [
            { name: "Python", topics: ["Variables and data types", "Conditions and loops", "Functions and modules", "Lists, tuples, sets and dictionaries", "Object-oriented programming", "File handling", "Exception handling", "Virtual environments and pip"] },
            { name: "Django", topics: ["Project and app structure", "Models and ORM", "Migrations", "Views and URL routing", "Templates", "Forms and validation", "Admin panel", "User authentication"] },
            { name: "REST APIs", topics: ["HTTP methods (GET, POST, PUT, DELETE)", "Status codes", "JSON data", "Serializers", "CRUD endpoints", "Testing with Postman"] },
            { name: "SQL", topics: ["SELECT, WHERE and ORDER BY", "INSERT, UPDATE and DELETE", "Joins", "GROUP BY and aggregates", "Primary and foreign keys", "Normalization basics"] }
        ],
        Tools: [
            { name: "Git", topics: ["init, add and commit", "Branches and merging", "push and pull", "Resolving conflicts"] },
            { name: "GitHub", topics: ["Repositories", "README files", "Pull requests", "GitHub Pages"] },
            { name: "VS Code", topics: ["Extensions", "Integrated terminal", "Debugging", "Shortcuts and snippets"] },
            { name: "Postman", topics: ["Sending API requests", "Collections", "Environment variables", "Checking responses"] }
        ]
    },
    projects: [
        { title: "CricketConnect", type: "Full Stack", desc: "A hub for local cricket communities to organise tournaments, teams and fixtures.", stack: ["Django", "React", "REST API"], link: "#" },
        { title: "Personal Portfolio", type: "Frontend", desc: "A responsive, theme-aware portfolio built with React, CSS and JavaScript.", stack: ["React", "CSS", "JavaScript"], link: "#" },
        { title: "E-Commerce management system", type: "Backend", desc: "A feature-rich e-commerce platform with payment integration.", stack: ["Django", "Python", "REST API"], link: "#" }
    ],
    education: [
        { title: "Bachelor of Computer Applications (BCA)", where: "Sri Manakula Vinayagar Engineering College, Puducherry", meta: "Score: 82.2%" },
        { title: "NPTEL: Front-End Web Development", where: "HTML, CSS and JavaScript fundamentals", meta: "Certification" },
        { title: "Higher Secondary (XII)", where: "Pavendar Barathidasan Government Higher Secondary School, Puducherry", meta: "Score: 60.6%" },
        { title: "Secondary (X)", where: "Faithful Seventh Day Adventist Higher Secondary School, Puducherry", meta: "Score: 61.4%" }
    ]
};

/* ---------- Helpers ---------- */

function useReveal() {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); }
        }, { threshold: 0.12 });
        io.observe(el);
        return () => io.disconnect();
    }, []);
    return ref;
}

function Section({ id, num, title, children }) {
    const ref = useReveal();
    return h("section", { id, ref, className: "sec" },
        h("div", { className: "wrap" },
            h("div", { className: "sh" }, h("small", null, num), h("h2", null, title)),
            children));
}

function Typer({ words }) {
    const [i, setI] = useState(0);
    const [t, setT] = useState("");
    const [del, setDel] = useState(false);

    useEffect(() => {
        const w = words[i];
        let id;
        if (!del && t === w) id = setTimeout(() => setDel(true), 1400);
        else if (del && t === "") { setDel(false); setI((i + 1) % words.length); }
        else id = setTimeout(() => setT(del ? w.slice(0, t.length - 1) : w.slice(0, t.length + 1)), del ? 35 : 75);
        return () => clearTimeout(id);
    }, [t, del, i]);

    return h("span", null, t, h("i", { className: "caret" }));
}

/* ---------- Page parts ---------- */

function Header() {
    const toggle = () => {
        const root = document.documentElement;
        const cur = root.dataset.theme ||
            (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        const next = cur === "dark" ? "light" : "dark";
        root.dataset.theme = next;
        try { localStorage.setItem("theme", next); } catch (e) { }
    };
    const nav = [["about", "About"], ["skills", "Skills"], ["projects", "Projects"], ["education", "Education"], ["contact", "Contact"]];

    return h("header", null, h("div", { className: "wrap" }, h("nav", null,
        h("a", { href: "#top", className: "logo" }, "VA", h("span", null, ".")),
        h("div", { className: "links" },
            nav.map(([id, label]) => h("a", { key: id, href: "#" + id }, label)),
            h("button", { className: "tbtn", onClick: toggle }, "◐ theme")))));
}

function Hero() {
    const move = (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", (e.clientX - r.left) + "px");
        e.currentTarget.style.setProperty("--my", (e.clientY - r.top) + "px");
    };

    return h("div", { className: "hero", id: "top", onMouseMove: move },
        h("div", { className: "wrap hero-grid" },

            h("div", { className: "hero-text" },
                h("span", { className: "tag" }, "Open to work · Chennai · Bangalore, India"),
                h("h1", null, "Hi, I’m ", h("em", null, DATA.name)),
                h("div", { className: "role" }, "> ", h(Typer, { words: DATA.roles })),
                h("p", { className: "lead" }, DATA.intro),
                h("div", { className: "btns" },
                    h("a", { className: "btn primary", href: "#projects" }, "View my work"),
                    h("a", { className: "btn", href: DATA.resume, download: DATA.resume }, "Download Resume ↓"),
                    h("a", { className: "btn", href: "#contact" }, "Get in touch"))),

            h("div", { className: "photo" },
                h("img", { src: DATA.photo, alt: "Portrait of " + DATA.name }))
        ));
}

function About() {
    const facts = [["Role", "Python Full Stack Dev"], ["Location", "Puducherry, India"], ["Languages", "English, Tamil"], ["Focus", "Django + React"]];
    return h(Section, { id: "about", num: "01", title: "About me" },
        h("div", { className: "about" },
            h("div", null,
                h("p", null, "I’m a Python full stack developer who likes the whole journey of a feature: the data model, the API and the interface people touch."),
                h("p", null, "I hold a BCA degree and keep learning by building real projects and writing clean code.")),

            h("div", { className: "card" }, h("ul", { className: "facts" },
                facts.map(([k, v]) => h("li", { key: k }, h("span", null, k), h("b", null, v)))))));
}

function Skills() {
    const keys = Object.keys(DATA.skills);
    const [tab, setTab] = useState(keys[0]);
    const [sel, setSel] = useState(DATA.skills[keys[0]][0].name);
    const list = DATA.skills[tab];
    const current = list.find(s => s.name === sel) || list[0];

    const pickTab = (k) => { setTab(k); setSel(DATA.skills[k][0].name); };

    // numbers are calculated from DATA, so they stay correct when you edit skills
    const allSkills = keys.flatMap(k => DATA.skills[k]);
    const totalTopics = allSkills.reduce((n, s) => n + s.topics.length, 0);
    const stats = [[keys.length, "Categories"], [allSkills.length, "Skills"], [totalTopics, "Topics covered"]];

    return h(Section, { id: "skills", num: "02", title: "Skills" },

        h("p", { className: "sec-intro" },
            "These are the tools I use to build full stack web applications, from the interface people see to the database behind it. Choose a category, then click a skill to see the topics I have covered."),

        h("div", { className: "mini-stats" }, stats.map(([n, l]) =>
            h("div", { key: l, className: "ms" }, h("b", null, n), h("span", null, l)))),

        h("div", { className: "tabs" }, keys.map(k =>
            h("button", { key: k, className: "tab" + (k === tab ? " on" : ""), onClick: () => pickTab(k) }, k))),

        h("div", { className: "chips" }, list.map(s =>
            h("button", { key: s.name, className: "chip" + (s.name === current.name ? " on" : ""), onClick: () => setSel(s.name) }, s.name))),

        h("div", { className: "card detail", key: current.name },
            h("h3", null, current.name + ": topics covered"),
            h("ul", { className: "topics" }, current.topics.map(t => h("li", { key: t }, t)))));
}

function Projects() {
    const types = ["All", ...Array.from(new Set(DATA.projects.map(p => p.type)))];
    const [f, setF] = useState("All");
    const list = DATA.projects.filter(p => f === "All" || p.type === f);
    return h(Section, { id: "projects", num: "03", title: "Selected projects" },
        h("div", { className: "tabs" }, types.map(t =>
            h("button", { key: t, className: "tab" + (t === f ? " on" : ""), onClick: () => setF(t) }, t))),
        h("div", { className: "grid" }, list.map(p =>
            h("article", { key: p.title, className: "card proj" },
                h("span", { className: "plink" }, p.type),
                h("h3", null, p.title),
                h("p", null, p.desc),
                h("div", { className: "stack" }, p.stack.map(s => h("span", { key: s }, s))),
                h("a", { className: "plink", href: p.link }, "View project ↗")))));
}

function Education() {
    return h(Section, { id: "education", num: "04", title: "Education & certification" },
        h("div", { className: "tl" }, DATA.education.map(e =>
            h("div", { key: e.title, className: "ti" },
                h("div", { className: "m" }, e.meta),
                h("h3", null, e.title),
                h("p", null, e.where)))));
}

function Contact() {
    const [copied, setCopied] = useState(false);

    const gmailLink = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(DATA.email) +
        "&su=" + encodeURIComponent("Hello Vishwa, I saw your portfolio");

    const copyEmail = () => {
        const done = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(DATA.email).then(done).catch(() => { });
        } else {
            const ta = document.createElement("textarea");   // fallback for local files
            ta.value = DATA.email;
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand("copy"); done(); } catch (e) { }
            document.body.removeChild(ta);
        }
    };

    return h("section", { id: "contact", className: "contact" }, h("div", { className: "wrap" },
        h("h2", null, "Let’s build something."),
        h("p", { style: { color: "var(--muted)", margin: 0 } }, "I’m open to internships and full-time roles."),
        h("div", { className: "mail" }, DATA.email),
        h("div", { className: "soc" },
            h("a", { className: "btn primary", href: gmailLink, target: "_blank", rel: "noopener" }, "Send email (Gmail) ↗"),
            h("button", { className: "btn", onClick: copyEmail }, copied ? "Copied ✓" : "Copy email"),
            h("a", { className: "btn", href: DATA.resume, download: DATA.resume }, "Download Resume ↓"),
            h("a", { className: "btn", href: DATA.github, target: "_blank", rel: "noopener" }, "GitHub ↗"),
            h("a", { className: "btn", href: DATA.linkedin, target: "_blank", rel: "noopener" }, "LinkedIn ↗"))));
}

/* ---------- App (ONE copy, then render as the LAST line) ---------- */

function App() {
    useEffect(() => {
        try { const t = localStorage.getItem("theme"); if (t) document.documentElement.dataset.theme = t; } catch (e) { }
    }, []);
    return h(React.Fragment, null,
        h(Header),
        h("main", null, h(Hero), h(About), h(Skills), h(Projects), h(Education), h(Contact)),
        h("footer", null, "© " + new Date().getFullYear() + " " + DATA.name));
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));