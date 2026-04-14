export interface ConcreteClass {
  id: string;
  label: string;
  strength: number; // МПа
  application: string;
  description: string;
  color: string;
  colorDark: string;
  useCases: string[];
  composition: string;
  waterResistance: string;
  frostResistance: string;
}

export const concreteClasses: ConcreteClass[] = [
  {
    id: "B10",
    label: "B10",
    strength: 7.5,
    application: "Подготовительные работы",
    description: "Лёгкий бетон для подготовительных и вспомогательных работ",
    color: "#93c5fd",
    colorDark: "#3b82f6",
    useCases: ["Подбетонка", "Стяжки", "Дорожки в саду", "Заполнение пустот"],
    composition: "Цемент М300, песок, щебень мелкой фракции",
    waterResistance: "W2",
    frostResistance: "F50",
  },
  {
    id: "B15",
    label: "B15",
    strength: 11.0,
    application: "Лёгкие конструкции",
    description: "Подходит для малонагруженных конструкций и ограждений",
    color: "#6ee7b7",
    colorDark: "#10b981",
    useCases: ["Бордюры", "Заборные блоки", "Тротуарная плитка", "Ограждения"],
    composition: "Цемент М350, речной песок, щебень",
    waterResistance: "W4",
    frostResistance: "F75",
  },
  {
    id: "B20",
    label: "B20",
    strength: 15.0,
    application: "Фундаменты малоэтажных зданий",
    description: "Универсальный бетон для малоэтажного строительства",
    color: "#fde68a",
    colorDark: "#f59e0b",
    useCases: ["Фундаменты домов до 3 этажей", "Полы", "Дорожки", "Перемычки"],
    composition: "Цемент М400, песок, щебень 20 мм",
    waterResistance: "W4",
    frostResistance: "F100",
  },
  {
    id: "B25",
    label: "B25",
    strength: 18.5,
    application: "Монолитные перекрытия и колонны",
    description: "Популярный класс для жилого строительства",
    color: "#fca5a5",
    colorDark: "#ef4444",
    useCases: ["Монолитные перекрытия", "Колонны", "Лестницы", "Плиты"],
    composition: "Цемент М400, мытый песок, гранитный щебень",
    waterResistance: "W6",
    frostResistance: "F150",
  },
  {
    id: "B30",
    label: "B30",
    strength: 22.0,
    application: "Мосты, путепроводы",
    description: "Высокопрочный бетон для ответственных конструкций",
    color: "#c4b5fd",
    colorDark: "#8b5cf6",
    useCases: ["Мосты", "Путепроводы", "Тоннели", "Несущие конструкции"],
    composition: "Цемент М500, гранитный щебень, пластификаторы",
    waterResistance: "W8",
    frostResistance: "F200",
  },
  {
    id: "B35",
    label: "B35",
    strength: 25.5,
    application: "Высотные здания",
    description: "Для высотного строительства и сложных конструкций",
    color: "#f9a8d4",
    colorDark: "#ec4899",
    useCases: ["Высотные здания", "Подпорные стены", "Резервуары", "Дамбы"],
    composition: "Цемент М500 Д0, микрокремнезём, суперпластификатор",
    waterResistance: "W10",
    frostResistance: "F200",
  },
  {
    id: "B40",
    label: "B40",
    strength: 29.0,
    application: "Специальные сооружения",
    description: "Бетон повышенной прочности для инженерных сооружений",
    color: "#fdba74",
    colorDark: "#f97316",
    useCases: ["Шпунты", "Сваи", "Опоры мостов", "Хранилища"],
    composition: "Цемент М600, армирующие добавки, фибра",
    waterResistance: "W12",
    frostResistance: "F300",
  },
  {
    id: "B50",
    label: "B50",
    strength: 36.8,
    application: "Башни и уникальные объекты",
    description: "Высокопрочный бетон для уникальных объектов",
    color: "#a5f3fc",
    colorDark: "#06b6d4",
    useCases: ["Телебашни", "Атомные станции", "Морские платформы", "Уникальные объекты"],
    composition: "Специальный цемент, комплекс добавок, стальная фибра",
    waterResistance: "W14",
    frostResistance: "F400",
  },
  {
    id: "B60",
    label: "B60",
    strength: 43.5,
    application: "Ядерные объекты и мосты",
    description: "Сверхвысокопрочный бетон для критически важных объектов",
    color: "#bbf7d0",
    colorDark: "#22c55e",
    useCases: ["Ядерные объекты", "Крупные мосты", "Специальные хранилища"],
    composition: "Высокоалюминатный цемент, наноматериалы",
    waterResistance: "W16",
    frostResistance: "F500",
  },
  {
    id: "B90",
    label: "B90",
    strength: 67.0,
    application: "Уникальные инженерные конструкции",
    description: "Максимальная прочность — элита строительных материалов",
    color: "#fef08a",
    colorDark: "#eab308",
    useCases: ["Уникальные конструкции", "Космические объекты", "Рекордные сооружения"],
    composition: "Реакционно-порошковый бетон, суперпластификаторы, стальные волокна",
    waterResistance: "W20",
    frostResistance: "F1000",
  },
];

export const realObjects = [
  { concreteClass: "B25", name: "Жилой комплекс «Северная звезда»", type: "Жилой дом", lat: 59.95, lng: 30.32 },
  { concreteClass: "B30", name: "Мост Александра Невского", type: "Мост", lat: 59.93, lng: 30.39 },
  { concreteClass: "B35", name: "Лахта Центр", type: "Башня", lat: 60.02, lng: 30.19 },
  { concreteClass: "B40", name: "Западный скоростной диаметр", type: "Путепровод", lat: 59.90, lng: 30.17 },
  { concreteClass: "B20", name: "ТЦ «Галерея»", type: "Торговый центр", lat: 59.92, lng: 30.36 },
  { concreteClass: "B25", name: "Метро «Беговая»", type: "Метростанция", lat: 59.98, lng: 30.24 },
];

export const comparisonData = {
  car: { label: "Легковой автомобиль", weight: 1.5, unit: "т", emoji: "🚗", description: "Масса среднего легкового автомобиля ≈ 1.5 тонны" },
  water: { label: "Давление воды", depth: 100, pressure: 1.0, unit: "МПа/100м", emoji: "🌊", description: "Давление воды увеличивается на 1 МПа каждые 100 метров глубины" },
  elephant: { label: "Слон", weight: 5.0, unit: "т", emoji: "🐘", description: "Масса африканского слона ≈ 5 тонн" },
  boeing: { label: "Самолёт Boeing 737", weight: 41.0, unit: "т", emoji: "✈️", description: "Пустая масса Boeing 737 ≈ 41 тонна" },
};

export interface ConstructorParams {
  type: "foundation" | "column" | "bridge" | "floor" | "balcony" | "wall";
  load: "low" | "medium" | "high" | "extreme";
  conditions: "dry" | "wet" | "frost" | "aggressive";
}

export const constructorRecommendations: Record<string, { class: string; reason: string }> = {
  "foundation-low-dry": { class: "B15", reason: "Малонагруженный фундамент в сухих условиях допускает B15" },
  "foundation-low-wet": { class: "B20", reason: "Влажные условия требуют повышенной водостойкости — B20" },
  "foundation-medium-dry": { class: "B20", reason: "Умеренная нагрузка на фундамент — оптимален B20" },
  "foundation-medium-wet": { class: "B25", reason: "Влажность + умеренная нагрузка — рекомендуем B25" },
  "foundation-high-dry": { class: "B25", reason: "Высокая нагрузка требует минимум B25" },
  "foundation-high-wet": { class: "B30", reason: "Тяжёлые условия — B30 обеспечит надёжность" },
  "foundation-high-frost": { class: "B35", reason: "Мороз + нагрузка — нужна морозостойкость B35" },
  "foundation-extreme-aggressive": { class: "B40", reason: "Экстремальные условия — только B40+" },
  "column-low-dry": { class: "B20", reason: "Лёгкая колонна — B20 достаточно" },
  "column-medium-dry": { class: "B25", reason: "Стандартная колонна — B25" },
  "column-high-dry": { class: "B30", reason: "Нагруженная колонна — B30" },
  "column-extreme-dry": { class: "B40", reason: "Критическая нагрузка на колонну — B40" },
  "bridge-medium-wet": { class: "B30", reason: "Мосты в умеренных условиях — минимум B30" },
  "bridge-high-wet": { class: "B35", reason: "Нагруженный мост с влагой — B35" },
  "bridge-high-frost": { class: "B40", reason: "Мост в суровом климате — B40" },
  "bridge-extreme-aggressive": { class: "B50", reason: "Особые условия для моста — B50" },
  "floor-low-dry": { class: "B15", reason: "Лёгкое перекрытие — B15" },
  "floor-medium-dry": { class: "B20", reason: "Жилое перекрытие — B20" },
  "floor-high-dry": { class: "B25", reason: "Промышленный пол — B25" },
  "balcony-medium-wet": { class: "B25", reason: "Балкон с атмосферным воздействием — B25" },
  "balcony-high-frost": { class: "B30", reason: "Балкон в суровом климате — B30" },
  "wall-low-dry": { class: "B15", reason: "Ненесущая стена — B15" },
  "wall-medium-dry": { class: "B20", reason: "Несущая стена — B20" },
  "wall-high-frost": { class: "B30", reason: "Несущая стена в холодном климате — B30" },
};
