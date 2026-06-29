export type ProjectTone = "green" | "yellow" | "red";
export type ProjectVisual = "robot" | "app" | "print";

export type ProjectMedia = {
  type: "video" | "image";
  title: string;
  caption: string;
  src?: string;
};

export type AipProject = {
  slug: string;
  grade: string;
  title: string;
  shortDescription: string;
  description: string;
  objective: string;
  process: string[];
  results: string[];
  tags: string[];
  team: string;
  duration: string;
  tools: string[];
  tone: ProjectTone;
  visual: ProjectVisual;
  media: ProjectMedia[];
};

export const filters = [
  "Todos",
  "1° de Secundaria",
  "2° de Secundaria",
  "3° de Secundaria",
  "4° de Secundaria",
  "5° de Secundaria"
];

export const projects: AipProject[] = [
  {
    slug: "robot-seguidor-linea",
    grade: "3° de Secundaria",
    title: "Robot Seguidor de Línea",
    shortDescription:
      "Los estudiantes diseñaron y construyeron un robot capaz de seguir una línea utilizando sensores y programación.",
    description:
      "Proyecto de robótica educativa donde el equipo integró diseño, sensores, electrónica básica y programación para crear un robot autónomo que identifica y sigue una ruta marcada.",
    objective:
      "Aplicar pensamiento computacional y resolución de problemas mediante un prototipo físico que pueda probarse, corregirse y mejorarse en equipo.",
    process: [
      "Exploración de sensores infrarrojos y motores.",
      "Diseño del circuito y montaje del chasis.",
      "Programación de la lógica de seguimiento.",
      "Pruebas en pista, ajustes de velocidad y calibración."
    ],
    results: [
      "Robot funcional capaz de completar una ruta guiada.",
      "Registro de errores y mejoras por iteración.",
      "Presentación del prototipo ante compañeros."
    ],
    tags: ["Robótica", "Programación", "Electrónica"],
    team: "Equipo de innovación de 3° de Secundaria",
    duration: "4 semanas",
    tools: ["Sensores IR", "Motores DC", "Microcontrolador", "Pista de pruebas"],
    tone: "green",
    visual: "robot",
    media: [
      {
        type: "video",
        title: "Prueba en pista",
        caption: "Demostración del robot siguiendo una línea y corrigiendo su dirección."
      },
      {
        type: "image",
        title: "Montaje del circuito",
        caption: "Vista del prototipo durante el armado y calibración."
      },
      {
        type: "image",
        title: "Equipo de trabajo",
        caption: "Estudiantes documentando pruebas y mejoras.",
        src: "/images/d31d5023-4f75-49fe-8fb9-4989757ea411.png"
      }
    ]
  },
  {
    slug: "app-escolar-conectando-ideas",
    grade: "4° de Secundaria",
    title: "App Escolar: Conectando Ideas",
    shortDescription:
      "Aplicación móvil creada para mejorar la comunicación y organización en nuestra institución.",
    description:
      "Proyecto de diseño y desarrollo donde los estudiantes plantearon una app escolar para consultar noticias, eventos, recursos y comunicados del Aula AIP desde el celular.",
    objective:
      "Diseñar una solución digital útil para la comunidad educativa, priorizando claridad, navegación simple y necesidades reales de estudiantes y docentes.",
    process: [
      "Investigación de necesidades con estudiantes.",
      "Bocetos de pantallas y flujo de navegación.",
      "Diseño de interfaz con componentes reutilizables.",
      "Prototipo y prueba de uso con retroalimentación."
    ],
    results: [
      "Prototipo navegable de la aplicación.",
      "Sistema visual inspirado en los colores institucionales.",
      "Mejoras documentadas a partir de pruebas con usuarios."
    ],
    tags: ["Desarrollo Mobile", "Diseño UI/UX", "Innovación"],
    team: "Equipo digital de 4° de Secundaria",
    duration: "5 semanas",
    tools: ["Figma", "Componentes UI", "Pruebas de usuario", "Mapa de navegación"],
    tone: "yellow",
    visual: "app",
    media: [
      {
        type: "video",
        title: "Recorrido de pantallas",
        caption: "Vista guiada del flujo principal: inicio, noticias, recursos y contacto."
      },
      {
        type: "image",
        title: "Pantallas principales",
        caption: "Diseño de módulos para eventos, guías y proyectos."
      },
      {
        type: "image",
        title: "Presentación del equipo",
        caption: "Explicación del prototipo y decisiones de diseño.",
        src: "/images/d31d5023-4f75-49fe-8fb9-4989757ea411.png"
      }
    ]
  },
  {
    slug: "impresion-3d-futuro",
    grade: "5° de Secundaria",
    title: "Impresión 3D: Diseñando el Futuro",
    shortDescription:
      "Proyecto donde los estudiantes diseñaron e imprimieron en 3D objetos útiles para la comunidad educativa.",
    description:
      "Experiencia de fabricación digital donde los estudiantes pasaron de una idea a un objeto físico, aprendiendo modelado, medidas, prototipado y mejora de piezas.",
    objective:
      "Comprender el ciclo de diseño de producto mediante prototipos impresos que resuelvan pequeñas necesidades del aula y la institución.",
    process: [
      "Identificación de necesidades y bocetos iniciales.",
      "Modelado 3D con medidas reales.",
      "Preparación de impresión y selección de parámetros.",
      "Evaluación del prototipo y ajustes finales."
    ],
    results: [
      "Piezas funcionales impresas en 3D.",
      "Aprendizaje de tolerancias, escala y materiales.",
      "Exposición de prototipos con ficha técnica."
    ],
    tags: ["Impresión 3D", "Diseño", "Fabricación Digital"],
    team: "Laboratorio creativo de 5° de Secundaria",
    duration: "6 semanas",
    tools: ["Software 3D", "Impresora 3D", "Filamento PLA", "Calibración"],
    tone: "red",
    visual: "print",
    media: [
      {
        type: "video",
        title: "Proceso de impresión",
        caption: "Vista del prototipo formándose capa por capa."
      },
      {
        type: "image",
        title: "Modelo terminado",
        caption: "Objeto final luego de retirar soportes y revisar medidas."
      },
      {
        type: "image",
        title: "Feria de prototipos",
        caption: "Presentación del proyecto ante la comunidad educativa.",
        src: "/images/d31d5023-4f75-49fe-8fb9-4989757ea411.png"
      }
    ]
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
