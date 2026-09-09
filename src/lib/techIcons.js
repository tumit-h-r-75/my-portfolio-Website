import { FaCode } from "react-icons/fa";
import {
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiDaisyui,
  SiRedux,
  SiJquery,
  SiVite,
  SiWebpack,
  SiFramer,
  SiMui,
  SiChakraui,
  SiAntdesign,
  SiGreensock,
  SiThreedotjs,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiDjango,
  SiFlask,
  SiLaravel,
  SiPhp,
  SiPython,
  SiOpenjdk,
  SiSpring,
  SiRuby,
  SiRubyonrails,
  SiGraphql,
  SiApollographql,
  SiSocketdotio,
  SiJsonwebtokens,
  SiMongodb,
  SiMongoose,
  SiMysql,
  SiPostgresql,
  SiSqlite,
  SiFirebase,
  SiRedis,
  SiSupabase,
  SiPrisma,
  SiDocker,
  SiKubernetes,
  SiAmazonwebservices,
  SiVercel,
  SiNetlify,
  SiHeroku,
  SiGit,
  SiGithub,
  SiGitlab,
  SiNginx,
  SiLinux,
  SiFigma,
  SiPostman,
  SiNpm,
  SiCloudinary,
  SiStripe,
  SiPaypal,
  SiWordpress,
  SiWebflow,
  SiChartdotjs,
  SiAxios,
  SiEslint,
  SiPrettier,
  SiJest,
  SiCypress,
  SiStorybook,
  SiElectron,
  SiFlutter,
  SiDart,
  SiKotlin,
  SiSwift,
  SiCplusplus,
  SiDotnet,
  SiGo,
  SiRust,
} from "react-icons/si";

/**
 * Central tech-stack icon registry. Every project/skill tag typed anywhere
 * in the app (public site + admin dashboard) is looked up here so a tag
 * never renders without a matching brand icon unless it's truly unknown.
 * Keys are normalized: lowercase, letters/numbers only.
 */
const REGISTRY = [
  { match: ["react", "reactjs"], label: "React", icon: SiReact, color: "#61DAFB" },
  { match: ["nextjs", "next"], label: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { match: ["vue", "vuejs"], label: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
  { match: ["angular"], label: "Angular", icon: SiAngular, color: "#DD0031" },
  { match: ["svelte"], label: "Svelte", icon: SiSvelte, color: "#FF3E00" },
  { match: ["html", "html5"], label: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { match: ["css", "css3"], label: "CSS3", icon: SiCss3, color: "#1572B6" },
  { match: ["javascript", "js"], label: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { match: ["typescript", "ts"], label: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { match: ["tailwind", "tailwindcss"], label: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
  { match: ["bootstrap"], label: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
  { match: ["sass", "scss"], label: "Sass", icon: SiSass, color: "#CC6699" },
  { match: ["daisyui"], label: "DaisyUI", icon: SiDaisyui, color: "#5A0EF8" },
  { match: ["redux", "redux toolkit", "rtk"], label: "Redux", icon: SiRedux, color: "#764ABC" },
  { match: ["jquery"], label: "jQuery", icon: SiJquery, color: "#0769AD" },
  { match: ["vite"], label: "Vite", icon: SiVite, color: "#646CFF" },
  { match: ["webpack"], label: "Webpack", icon: SiWebpack, color: "#8DD6F9" },
  { match: ["framer", "framermotion", "framer motion"], label: "Framer Motion", icon: SiFramer, color: "#FFFFFF" },
  { match: ["mui", "materialui", "material ui"], label: "MUI", icon: SiMui, color: "#007FFF" },
  { match: ["chakra", "chakraui", "chakra ui"], label: "Chakra UI", icon: SiChakraui, color: "#319795" },
  { match: ["antdesign", "antd", "ant design"], label: "Ant Design", icon: SiAntdesign, color: "#0170FE" },
  { match: ["gsap", "greensock"], label: "GSAP", icon: SiGreensock, color: "#88CE02" },
  { match: ["threejs", "three.js", "three"], label: "Three.js", icon: SiThreedotjs, color: "#FFFFFF" },

  { match: ["node", "nodejs"], label: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { match: ["express", "expressjs"], label: "Express.js", icon: SiExpress, color: "#FFFFFF" },
  { match: ["nestjs", "nest"], label: "NestJS", icon: SiNestjs, color: "#E0234E" },
  { match: ["django"], label: "Django", icon: SiDjango, color: "#0C4B33" },
  { match: ["flask"], label: "Flask", icon: SiFlask, color: "#FFFFFF" },
  { match: ["laravel"], label: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { match: ["php"], label: "PHP", icon: SiPhp, color: "#777BB4" },
  { match: ["python"], label: "Python", icon: SiPython, color: "#3776AB" },
  { match: ["java"], label: "Java", icon: SiOpenjdk, color: "#EA2D2E" },
  { match: ["spring", "springboot", "spring boot"], label: "Spring Boot", icon: SiSpring, color: "#6DB33F" },
  { match: ["ruby"], label: "Ruby", icon: SiRuby, color: "#CC342D" },
  { match: ["rubyonrails", "rails"], label: "Ruby on Rails", icon: SiRubyonrails, color: "#CC0000" },
  { match: ["graphql"], label: "GraphQL", icon: SiGraphql, color: "#E10098" },
  { match: ["apollo", "apollographql", "apollo graphql"], label: "Apollo GraphQL", icon: SiApollographql, color: "#311C87" },
  { match: ["socketio", "socket.io", "socket"], label: "Socket.IO", icon: SiSocketdotio, color: "#FFFFFF" },
  { match: ["jwt", "jsonwebtoken", "json web token"], label: "JWT", icon: SiJsonwebtokens, color: "#D63AFF" },

  { match: ["mongodb", "mongo"], label: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { match: ["mongoose"], label: "Mongoose", icon: SiMongoose, color: "#F04D35" },
  { match: ["mysql"], label: "MySQL", icon: SiMysql, color: "#4479A1" },
  { match: ["postgresql", "postgres"], label: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { match: ["sqlite"], label: "SQLite", icon: SiSqlite, color: "#003B57" },
  { match: ["firebase"], label: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { match: ["redis"], label: "Redis", icon: SiRedis, color: "#FF4438" },
  { match: ["supabase"], label: "Supabase", icon: SiSupabase, color: "#3FCF8E" },
  { match: ["prisma"], label: "Prisma", icon: SiPrisma, color: "#FFFFFF" },

  { match: ["docker"], label: "Docker", icon: SiDocker, color: "#2496ED" },
  { match: ["kubernetes", "k8s"], label: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
  { match: ["aws", "amazonwebservices"], label: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
  { match: ["vercel"], label: "Vercel", icon: SiVercel, color: "#FFFFFF" },
  { match: ["netlify"], label: "Netlify", icon: SiNetlify, color: "#00C7B7" },
  { match: ["heroku"], label: "Heroku", icon: SiHeroku, color: "#430098" },
  { match: ["git"], label: "Git", icon: SiGit, color: "#F05032" },
  { match: ["github"], label: "GitHub", icon: SiGithub, color: "#FFFFFF" },
  { match: ["gitlab"], label: "GitLab", icon: SiGitlab, color: "#FC6D26" },
  { match: ["nginx"], label: "Nginx", icon: SiNginx, color: "#009639" },
  { match: ["linux"], label: "Linux", icon: SiLinux, color: "#FFFFFF" },
  { match: ["figma"], label: "Figma", icon: SiFigma, color: "#F24E1E" },
  { match: ["postman"], label: "Postman", icon: SiPostman, color: "#FF6C37" },
  { match: ["npm"], label: "npm", icon: SiNpm, color: "#CB3837" },
  { match: ["cloudinary"], label: "Cloudinary", icon: SiCloudinary, color: "#3448C5" },
  { match: ["stripe"], label: "Stripe", icon: SiStripe, color: "#635BFF" },
  { match: ["paypal"], label: "PayPal", icon: SiPaypal, color: "#00457C" },
  { match: ["wordpress"], label: "WordPress", icon: SiWordpress, color: "#21759B" },
  { match: ["webflow"], label: "Webflow", icon: SiWebflow, color: "#4353FF" },
  { match: ["chartjs", "chart.js"], label: "Chart.js", icon: SiChartdotjs, color: "#FF6384" },
  { match: ["axios"], label: "Axios", icon: SiAxios, color: "#5A29E4" },
  { match: ["eslint"], label: "ESLint", icon: SiEslint, color: "#4B32C3" },
  { match: ["prettier"], label: "Prettier", icon: SiPrettier, color: "#F7B93E" },
  { match: ["jest"], label: "Jest", icon: SiJest, color: "#C21325" },
  { match: ["cypress"], label: "Cypress", icon: SiCypress, color: "#FFFFFF" },
  { match: ["storybook"], label: "Storybook", icon: SiStorybook, color: "#FF4785" },
  { match: ["electron"], label: "Electron", icon: SiElectron, color: "#47848F" },
  { match: ["flutter"], label: "Flutter", icon: SiFlutter, color: "#02569B" },
  { match: ["dart"], label: "Dart", icon: SiDart, color: "#0175C2" },
  { match: ["kotlin"], label: "Kotlin", icon: SiKotlin, color: "#7F52FF" },
  { match: ["swift"], label: "Swift", icon: SiSwift, color: "#F05138" },
  { match: ["c++", "cplusplus"], label: "C++", icon: SiCplusplus, color: "#00599C" },
  { match: ["dotnet", ".net", "csharp", "c#"], label: ".NET", icon: SiDotnet, color: "#512BD4" },
  { match: ["go", "golang"], label: "Go", icon: SiGo, color: "#00ADD8" },
  { match: ["rust"], label: "Rust", icon: SiRust, color: "#F74C00" },
];

const normalize = (name = "") =>
  String(name)
    .toLowerCase()
    .trim()
    .replace(/[.\s]/g, "");

const LOOKUP = new Map();
REGISTRY.forEach((entry) => {
  entry.match.forEach((alias) => LOOKUP.set(normalize(alias), entry));
});

/** Nicely capitalised label to display for a raw tag, even when unknown. */
export const cleanTechName = (name = "") => {
  const entry = LOOKUP.get(normalize(name));
  if (entry) return entry.label;
  return String(name).trim();
};

/**
 * Resolve a free-text tech tag (as typed into the admin "Tags" field) to a
 * brand icon + color. Falls back to a generic code icon instead of nothing,
 * so a tag never renders with a blank space where its icon should be.
 */
export const getTechIcon = (name = "") => {
  const entry = LOOKUP.get(normalize(name));
  if (entry) return { Icon: entry.icon, color: entry.color, label: entry.label, known: true };
  return { Icon: FaCode, color: "#a3e635", label: String(name).trim(), known: false };
};

export default getTechIcon;
