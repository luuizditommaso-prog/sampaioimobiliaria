import React, { useEffect, useMemo, useRef, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import RevealOnScroll from "./components/RevealOnScroll";
import {
  Home,
  Building2,
  Search,
  Briefcase,
  Phone,
  Users,
  BedDouble,
  Bath,
  Square,
  ChevronDown,
  ChevronUp,
  Trash2,
  Pencil,
  Plus,
  LogIn,
  LogOut,
  Menu,
  X,
  PlayCircle,
  Check,
  MessageCircle,
} from "lucide-react";

import flavioImg from "./assets/consultores/Flavio.jpg";
import anteroImg from "./assets/consultores/antero.jpg";
import marcoImg from "./assets/consultores/Marco.jpg";
import renataImg from "./assets/consultores/Renata.jpg";
import tatianaImg from "./assets/consultores/Tatiana.jpg";
import beatrizImg from "./assets/consultores/Beatriz.jpg";



const DISTRICTS = ["Aveiro", "Porto", "Setúbal"];
const COUNTIES = [
  "Baião",
  "Gondomar",
  "Maia",
  "Matosinhos",
  "Porto",
  "Santa Maria da Feira",
  "Seixal",
  "Valongo",
  "Vila Nova de Gaia",
];
const PARISHES = [
  "Águas Santas",
  "Arcozelo",
  "Baguim do Monte (Rio Tinto)",
  "Bonfim",
  "Campanhã",
  "Campo e Sobrado",
  "Canedo, Vale e Vila Maior",
  "Corroios",
  "Fânzeres e São Pedro da Cova",
  "Foz do Sousa e Covelo",
  "Gondomar (São Cosme), Valbom e Jovim",
  "Mafamude e Vilar do Paraíso",
  "Matosinhos e Leça da Palmeira",
  "Melres e Medas",
  "Paranhos",
  "Ramalde",
  "Rio Tinto",
  "Santa Cruz do Douro e São Tomé de Covelas",
  "Santa Marinha e São Pedro da Afurada",
  "São Mamede de Infesta e Senhora da Hora",
  "Valongo",
];
const ZONES = ["Campo 24 de Agosto", "Centro (São Cosme)", "Venda Nova"];
const NATURES = [
  "Andar de moradia",
  "Apartamento",
  "Escritório",
  "Loja",
  "Moradia",
  "Prédio",
  "Terreno",
];
const PROPERTY_TYPES = ["Apartamento", "Moradia", "Loja", "Escritório", "Prédios", "Terrenos"];
const BUSINESS_TYPES = ["Arrendamento", "Trespasse", "Venda"];
const PROPERTY_STATES = ["Disponível", "Em Construção", "Em Projecto", "Não Aplicável", "Novo", "Renovado", "Usado"];
const ENERGY_CLASSES = ["A+", "A", "B", "B-", "C", "D", "E", "F"];

const defaultImages = [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",
];

const consultants = [
  { name: "Flávio Sampaio", phone: "+351 910 037 055", image: flavioImg },
  { name: "Antero", phone: "+351 916 907 878", image: anteroImg },
  { name: "Marco", phone: "+351 912 926 744", image: marcoImg },
  { name: "Renata", phone: "+351 917 103 257", image: renataImg },
  { name: "Tatiana", phone: "+351 918 477 270", image: tatianaImg },
  { name: "Beatriz", phone: "", image: beatrizImg },
];

const initialProperties = [
  {
    id: "1",
    reference: "SMI-001",
    title: "Moradia T2 - Valbom - c/nova",
    description: "Moradia moderna com excelente exposição solar, acabamentos elegantes e ótima localização.",
    district: "Porto",
    county: "Gondomar",
    parish: "Gondomar (São Cosme), Valbom e Jovim",
    zone: "Centro (São Cosme)",
    state: "Novo",
    nature: "Moradia",
    typology: "T2",
    businessType: "Venda",
    price: 325000,
    bedrooms: 2,
    innerBedrooms: 0,
    bathrooms: 2,
    floor: 0,
    usefulArea: 98,
    grossArea: 124,
    energyClass: "A",
    images: defaultImages,
    videoUrl: "",
    location: "Rua Doutor Lopes Cardoso 56, São Cosme",
    divisions: { varandas: true, cozinha: true },
    surroundings: {
      banco: true,
      escola: true,
      farmacia: true,
      ginasio: false,
      metro: false,
      transportes: true,
      centroCidade: true,
      espacosVerdes: true,
    },
    equipments: { elevador: false },
    services: { cozinhaEquipada: true },
    infrastructure: { garagem: true },
  },
  {
    id: "2",
    reference: "SMI-002",
    title: "Apartamento T3 - Paranhos",
    description: "Apartamento espaçoso, ideal para família, com varanda e acesso rápido a serviços e transportes.",
    district: "Porto",
    county: "Porto",
    parish: "Paranhos",
    zone: "Campo 24 de Agosto",
    state: "Renovado",
    nature: "Apartamento",
    typology: "T3",
    businessType: "Arrendamento",
    price: 1450,
    bedrooms: 3,
    innerBedrooms: 0,
    bathrooms: 2,
    floor: 3,
    usefulArea: 112,
    grossArea: 128,
    energyClass: "B",
    images: [defaultImages[1], defaultImages[2], defaultImages[0]],
    videoUrl: "",
    location: "Paranhos, Porto",
    divisions: { varandas: true, cozinha: true },
    surroundings: {
      banco: true,
      escola: true,
      farmacia: true,
      ginasio: true,
      metro: true,
      transportes: true,
      centroCidade: false,
      espacosVerdes: true,
    },
    equipments: { elevador: true },
    services: { cozinhaEquipada: true },
    infrastructure: { garagem: false },
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function formatPrice(value, businessType) {
  if (!value) return "Sob consulta";
  const formatted = new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number(value));
  return businessType === "Arrendamento" ? `${formatted}/mês` : formatted;
}

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];

  function RevealOnScroll({ children, className = "" }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={classNames("reveal", isVisible && "reveal-visible", className)}
    >
      {children}
    </div>
  );

  return (
    <div
      ref={ref}
      className={classNames("reveal", isVisible && "reveal-visible", className)}
    >
      {children}
    </div>
  );
}
}

function App() {
  const routerNavigate = useNavigate();
  const location = useLocation();

  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [properties, setProperties] = useLocalStorage("sampaio-properties", initialProperties);
  const [loggedIn, setLoggedIn] = useLocalStorage("sampaio-admin-auth", false);
  const [language, setLanguage] = useState("PT");
  const [heroIndex, setHeroIndex] = useState(0);

  const [filters, setFilters] = useState({
    type: "",
    district: "",
    county: "",
    parish: "",
    zone: "",
    businessType: "",
    state: "",
    bedrooms: "",
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
  });

  useEffect(() => {
    const i = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % defaultImages.length);
    }, 4000);
    return () => clearInterval(i);
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesType = !filters.type || property.nature === filters.type || property.nature === filters.type.replace("Prédios", "Prédio");
      const matchesDistrict = !filters.district || property.district === filters.district;
      const matchesCounty = !filters.county || property.county === filters.county;
      const matchesParish = !filters.parish || property.parish === filters.parish;
      const matchesZone = !filters.zone || property.zone === filters.zone;
      const matchesBusiness = !filters.businessType || property.businessType === filters.businessType;
      const matchesState = !filters.state || property.state === filters.state;
      const matchesBedrooms = !filters.bedrooms || Number(property.bedrooms) === Number(filters.bedrooms);
      const matchesMinPrice = !filters.minPrice || Number(property.price) >= Number(filters.minPrice);
      const matchesMaxPrice = !filters.maxPrice || Number(property.price) <= Number(filters.maxPrice);
      const matchesMinArea = !filters.minArea || Number(property.grossArea) >= Number(filters.minArea);
      const matchesMaxArea = !filters.maxArea || Number(property.grossArea) <= Number(filters.maxArea);

      return matchesType && matchesDistrict && matchesCounty && matchesParish && matchesZone && matchesBusiness && matchesState && matchesBedrooms && matchesMinPrice && matchesMaxPrice && matchesMinArea && matchesMaxArea;
    });
  }, [properties, filters]);

  const selectedProperty = properties.find((p) => p.id === selectedPropertyId) || properties[0];

  const routeMap = {
    home: "/",
    properties: "/imoveis",
    "property-detail": "/imovel",
    developments: "/empreendimentos",
    "advanced-search": "/pesquisa",
    services: "/servicos",
    "service-energy": "/servicos/energia",
    "service-evaluation": "/servicos/avaliacao",
    "service-recruitment": "/servicos/recrutamento",
    contacts: "/contactos",
    about: "/quem-somos",
    terms: "/termos",
    privacy: "/privacidade",
    admin: "/admin",
  };

  const navigate = (targetPage) => {
    routerNavigate(routeMap[targetPage] || "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const openProperty = (id) => {
    setSelectedPropertyId(id);
    navigate("property-detail");
  };

  useEffect(() => { fetch("http://localhost:4000/api/test") .then(res => res.json()) .then(data => console.log(data)) .catch(err => console.error(err)); }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800">
<style>{`
  html { scroll-behavior: smooth; }
  body { font-family: Inter, system-ui, sans-serif; }
  .gold-gradient { background: linear-gradient(135deg, #b58b2a 0%, #e7c96c 100%); }
  .green-gradient { background: linear-gradient(135deg, #0d3b2e 0%, #1b5e4b 100%); }

  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s ease;
    will-change: opacity, transform;
  }

  .reveal-visible {
    opacity: 1;
    transform: translateY(0);
  }
`}</style>

      <Header
        currentPath={location.pathname}
        navigate={navigate}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        language={language}
        setLanguage={setLanguage}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              heroIndex={heroIndex}
              navigate={navigate}
              filters={filters}
              setFilters={setFilters}
              featured={properties.slice(0, 4)}
              openProperty={openProperty}
            />
          }
        />

        <Route
          path="/imoveis"
          element={
            <PropertiesPage
              filters={filters}
              setFilters={setFilters}
              properties={filteredProperties}
              openProperty={openProperty}
            />
          }
        />

        <Route
          path="/imovel"
          element={selectedProperty ? <PropertyDetailPage property={selectedProperty} /> : <EmptyState text="Nenhum imóvel selecionado." />}
        />

        <Route path="/empreendimentos" element={<DevelopmentsPage />} />

        <Route
          path="/pesquisa"
          element={<AdvancedSearchPage filters={filters} setFilters={setFilters} navigate={navigate} />}
        />

        <Route path="/servicos" element={<ServicesPage navigate={navigate} />} />
        <Route path="/servicos/energia" element={<EnergyPage />} />
        <Route path="/servicos/avaliacao" element={<EvaluationPage />} />
        <Route path="/servicos/recrutamento" element={<RecruitmentPage />} />
        <Route path="/contactos" element={<ContactsPage />} />
        <Route path="/quem-somos" element={<AboutPage />} />
        <Route path="/termos" element={<TermsPage />} />
        <Route path="/privacidade" element={<PrivacyPage />} />

        <Route
          path="/admin"
          element={
            <AdminPage
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              properties={properties}
              setProperties={setProperties}
              openProperty={openProperty}
            />
          }
        />
      </Routes>

      <Footer navigate={navigate} />
    </div>
  );
}

function Header({ currentPath, navigate, mobileMenuOpen, setMobileMenuOpen, language, setLanguage }) {
  const items = [
    ["Imóveis", "properties", Home, "/imoveis"],
    ["Empreendimentos", "developments", Building2, "/empreendimentos"],
    ["Pesquisa Avançada", "advanced-search", Search, "/pesquisa"],
    ["Serviços", "services", Briefcase, "/servicos"],
    ["Contactos", "contacts", Phone, "/contactos"],
    ["Quem Somos", "about", Users, "/quem-somos"],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f2f25]/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <button onClick={() => navigate("home")} className="cursor-pointer text-left">
          <div className="text-xl font-bold tracking-wide">SAMPAIO</div>
          <div className="text-xs uppercase tracking-[0.25em] text-amber-300">Mediação Imobiliária</div>
        </button>

        <nav className="hidden items-center gap-5 lg:flex">
          {items.map(([label, target, Icon, path]) => (
            <button
              key={target}
              onClick={() => navigate(target)}
              className={classNames(
                "cursor-pointer flex items-center gap-2 rounded-full px-3 py-2 text-sm transition hover:bg-white/10 hover:text-amber-300",
                currentPath === path && "bg-white/10 text-amber-300"
              )}
            >
              <Icon size={16} /> {label}
            </button>
          ))}

          <button
            onClick={() => navigate("admin")}
            className="cursor-pointer rounded-full border border-amber-300/40 px-4 py-2 text-sm text-amber-200 transition hover:bg-amber-300 hover:text-[#0f2f25]"
          >
            Área do Corretor
          </button>

          <button
            onClick={() => setLanguage((prev) => (prev === "PT" ? "EN" : "PT"))}
            className="cursor-pointer rounded-full bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
          >
            {language}
          </button>
        </nav>

        <button className="cursor-pointer lg:hidden" onClick={() => setMobileMenuOpen((v) => !v)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#0f2f25] px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {items.map(([label, target]) => (
              <button
                key={target}
                onClick={() => navigate(target)}
                className="cursor-pointer rounded-xl px-4 py-3 text-left text-sm hover:bg-white/10"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => navigate("admin")}
              className="cursor-pointer rounded-xl bg-amber-400 px-4 py-3 text-left font-semibold text-[#0f2f25]"
            >
              Área do Corretor
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function HomePage({ heroIndex, navigate, filters, setFilters, featured, openProperty }) {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000" style={{ backgroundImage: `url(${defaultImages[heroIndex]})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#082119]/90 via-[#082119]/70 to-[#082119]/40" />
        <div className="relative mx-auto grid min-h-[78vh] max-w-7xl items-center gap-8 px-4 py-14 md:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div className="max-w-2xl text-white">
            <div className="mb-4 inline-flex rounded-full border border-amber-300/30 bg-white/10 px-4 py-2 text-sm text-amber-200 backdrop-blur">
              Moderno, elegante e preparado para conversão
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Encontre o imóvel certo com uma experiência <span className="text-amber-300">premium</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 md:text-lg">
              Compra, venda, arrendamento e trespasses com um site pensado para transmitir confiança, sofisticação e facilidade de navegação.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => navigate("properties")} className="cursor-pointer rounded-full bg-amber-400 px-6 py-3 font-semibold text-[#0f2f25] transition hover:scale-[1.02]">
                Ver Imóveis
              </button>
              <button onClick={() => navigate("advanced-search")} className="cursor-pointer rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur hover:bg-white/20">
                Pesquisa Avançada
              </button>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/95 p-5 shadow-2xl backdrop-blur md:p-6">
            <h2 className="mb-4 text-xl font-bold text-[#0f2f25]">Pesquisar imóvel</h2>
            <PropertyFilters filters={filters} setFilters={setFilters} compact />
            <button onClick={() => navigate("properties")} className="cursor-pointer mt-4 w-full rounded-2xl bg-[#0f2f25] px-4 py-3 font-semibold text-white hover:bg-[#164534]">
              Pesquisar
            </button>
          </div>
        </div>
      </section>

      <RevealOnScroll>
  <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
    <SectionHeading title="Comprar ou Arrendar?" subtitle="Descubra a melhor opção para o seu momento de vida" />
    <div className="mt-10 grid gap-6 md:grid-cols-2">
      <ActionCard title="Imóveis para venda" image={defaultImages[0]} onClick={() => navigate("properties")} />
      <ActionCard
        title="Imóveis para arrendamento"
        image={defaultImages[1]}
        onClick={() => {
          setFilters({ ...filters, businessType: "Arrendamento" });
          navigate("properties");
        }}
      />
    </div>
  </section>
</RevealOnScroll>

     <RevealOnScroll>
  <section className="green-gradient py-20 text-white">
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <SectionHeading title="Destaques da semana" subtitle="Imóveis novos selecionados para gerar impacto e conversão" light />
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {featured.map((property) => (
          <PropertyCard key={property.id} property={property} onClick={() => openProperty(property.id)} dark />
        ))}
      </div>
    </div>
  </section>
</RevealOnScroll>

      <RevealOnScroll>
  <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
    <SectionHeading title="Serviço" subtitle="Uma estrutura completa para apoiar todas as etapas do processo imobiliário" />
    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {[
        ["Certificação energética", "service-energy", "Classificação energética e enquadramento legal."],
        ["Avaliação de imóveis", "service-evaluation", "Critérios, documentos e fatores de valorização."],
        ["Recrutamento", "service-recruitment", "Junte-se a uma equipa em crescimento."],
      ].map(([title, target, text]) => (
        <button key={title} onClick={() => navigate(target)} className="cursor-pointer rounded-[28px] border border-slate-200 bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-[#0f2f25]">
            <Briefcase size={22} />
          </div>
          <h3 className="text-xl font-bold text-[#0f2f25]">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
        </button>
      ))}
    </div>
  </section>
</RevealOnScroll>
    </main>
  );
}

function PropertiesPage({ filters, setFilters, properties, openProperty }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <HeroMini title="Imóveis" subtitle="Explore o portfólio e filtre pelos detalhes que mais importam" image={defaultImages[0]} />
      <div className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr]">
        <aside className="h-fit rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-xl font-bold text-[#0f2f25]">Filtrar imóveis</h3>
          <PropertyFilters filters={filters} setFilters={setFilters} />
        </aside>
        <section>
          <div className="mb-5 flex items-center justify-between gap-4">
            <h3 className="text-2xl font-bold text-[#0f2f25]">{properties.length} imóvel(is) encontrado(s)</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} onClick={() => openProperty(property.id)} />
            ))}
          </div>
          {properties.length === 0 && <EmptyState text="Nenhum imóvel encontrado com estes filtros." />}
        </section>
      </div>
    </main>
  );
}

function PropertyDetailPage({ property }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [openSections, setOpenSections] = useState({ divisoes: true, zona: true, equipamentos: true, extras: true, areas: true, servicos: true, infra: true });

  const toggleSection = (key) => setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <HeroMini title={property.title} subtitle={`${property.district} > ${property.county}`} image={property.images[0]} />

      <div className="mt-10 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <section>
          <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
            <img src={property.images[imageIndex]} alt={property.title} className="h-[420px] w-full object-cover" />
            <div className="grid grid-cols-3 gap-3 p-4 md:grid-cols-5">
              {property.images.map((img, index) => (
                <button
                  key={img + index}
                  onClick={() => setImageIndex(index)}
                  className={classNames("cursor-pointer overflow-hidden rounded-2xl border-2", imageIndex === index ? "border-amber-400" : "border-transparent")}
                >
                  <img src={img} alt="Miniatura" className="h-20 w-full object-cover" />
                </button>
              ))}
              <div className="flex h-20 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-500">
                <PlayCircle size={24} />
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-2 text-sm uppercase tracking-[0.2em] text-amber-600">{property.businessType}</div>
            <h2 className="text-3xl font-bold text-[#0f2f25]">{formatPrice(property.price, property.businessType)}</h2>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2"><BedDouble size={16} /> {property.bedrooms} quartos</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2"><Bath size={16} /> {property.bathrooms} WC</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2"><Square size={16} /> {property.grossArea} m²</span>
            </div>
          </div>

          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-[#0f2f25]">Pedido de contacto</h3>
            <div className="mt-4 space-y-3">
              <select className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#0f2f25]">
                <option>Pedido de informação</option>
                <option>Pedido de visita</option>
              </select>
              <input placeholder="Nome" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#0f2f25]" />
              <input placeholder="Telefone" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#0f2f25]" />
              <input placeholder="Email" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#0f2f25]" />
              <textarea placeholder="Mensagem" rows={5} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#0f2f25]" />
              <label className="flex items-start gap-3 text-sm text-slate-600">
                <input type="checkbox" className="mt-1" />
                <span>Declaro que li, compreendi e aceito os Termos e Condições e a Política de Privacidade.</span>
              </label>
              <button className="cursor-pointer w-full rounded-2xl bg-[#0f2f25] px-4 py-3 font-semibold text-white hover:bg-[#164534]">Enviar pedido</button>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[1fr_0.9fr]">
        <section className="space-y-8">
          <CardBlock title="Descrição do imóvel">
            <p className="leading-8 text-slate-700">{property.description}</p>
          </CardBlock>

          <CardBlock title="Detalhes do Imóvel">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <DetailItem label="Distrito" value={property.district} />
              <DetailItem label="Concelho" value={property.county} />
              <DetailItem label="Freguesia" value={property.parish} />
              <DetailItem label="Estado" value={property.state} />
              <DetailItem label="Referência" value={property.reference} />
              <DetailItem label="Natureza" value={property.nature} />
              <DetailItem label="Tipologia" value={property.typology} />
              <DetailItem label="Área útil" value={`${property.usefulArea} m²`} />
              <DetailItem label="Área Bruta" value={`${property.grossArea} m²`} />
              <DetailItem label="Categoria Energética" value={property.energyClass} />
              <DetailItem label="Venda/Valor" value={formatPrice(property.price, property.businessType)} />
            </div>
          </CardBlock>

          <CardBlock title="Características do Imóvel">
            <Accordion title="Divisões" open={openSections.divisoes} onToggle={() => toggleSection("divisoes")}>
              <FeatureRow label="Casas de Banho" value={property.bathrooms} />
              <FeatureCheck label="Varandas" checked={property.divisions?.varandas} />
              <FeatureCheck label="Cozinha" checked={property.divisions?.cozinha} />
              <FeatureRow label="Total de quarto(s) interiores" value={property.innerBedrooms} />
              <FeatureRow label="Total de quarto(s)" value={property.bedrooms} />
            </Accordion>
            <Accordion title="Zona Envolvente" open={openSections.zona} onToggle={() => toggleSection("zona")}>
              <FeatureCheck label="Banco" checked={property.surroundings?.banco} />
              <FeatureCheck label="Escola" checked={property.surroundings?.escola} />
              <FeatureCheck label="Farmácia" checked={property.surroundings?.farmacia} />
              <FeatureCheck label="Ginásio" checked={property.surroundings?.ginasio} />
              <FeatureCheck label="Metro" checked={property.surroundings?.metro} />
              <FeatureCheck label="Transportes Públicos" checked={property.surroundings?.transportes} />
              <FeatureCheck label="Centro da Cidade" checked={property.surroundings?.centroCidade} />
              <FeatureCheck label="Espaços Verdes" checked={property.surroundings?.espacosVerdes} />
            </Accordion>
            <Accordion title="Equipamentos" open={openSections.equipamentos} onToggle={() => toggleSection("equipamentos")}>
              <FeatureCheck label="Elevador" checked={property.equipments?.elevador} />
            </Accordion>
          </CardBlock>
        </section>

        <aside>
          <CardBlock title="Localização do Imóvel">
            <div className="overflow-hidden rounded-[24px] border border-slate-200">
              <iframe title="Mapa" src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`} className="h-[420px] w-full" />
            </div>
          </CardBlock>
        </aside>
      </div>
    </main>
  );
}

function DevelopmentsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <HeroMini title="Empreendimentos" subtitle="Mesma lógica de pesquisa com foco em novos empreendimentos" image={defaultImages[2]} />
      <div className="mt-10 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <input placeholder="Nome" className="rounded-2xl border border-slate-300 px-4 py-3" />
          <select className="rounded-2xl border border-slate-300 px-4 py-3"><option>Distrito</option>{DISTRICTS.map((x) => <option key={x}>{x}</option>)}</select>
          <select className="rounded-2xl border border-slate-300 px-4 py-3"><option>Concelho</option>{COUNTIES.map((x) => <option key={x}>{x}</option>)}</select>
          <select className="rounded-2xl border border-slate-300 px-4 py-3"><option>Freguesia</option>{PARISHES.map((x) => <option key={x}>{x}</option>)}</select>
          <select className="rounded-2xl border border-slate-300 px-4 py-3"><option>Zona</option>{ZONES.map((x) => <option key={x}>{x}</option>)}</select>
          <select className="rounded-2xl border border-slate-300 px-4 py-3"><option>Estado</option>{PROPERTY_STATES.map((x) => <option key={x}>{x}</option>)}</select>
        </div>
        <button className="cursor-pointer mt-4 rounded-2xl bg-[#0f2f25] px-6 py-3 font-semibold text-white">Pesquisar</button>
      </div>
    </main>
  );
}

function AdvancedSearchPage({ filters, setFilters, navigate }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <HeroMini title="Pesquisa Avançada" subtitle="Selecione todos os detalhes e vá direto para os resultados" image={defaultImages[1]} />
      <div className="mt-10 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
        <PropertyFilters filters={filters} setFilters={setFilters} />
        <button onClick={() => navigate("properties")} className="cursor-pointer mt-4 rounded-2xl bg-[#0f2f25] px-6 py-3 font-semibold text-white">Pesquisar imóveis</button>
      </div>
    </main>
  );
}

function ServicesPage({ navigate }) {
  const cards = [
    ["Golden Visa", "service-energy", "CERTIFICAÇÃO ENERGÉTICA"],
    ["Avaliação de Imóveis", "service-evaluation", "AVALIAÇÃO DE IMÓVEIS"],
    ["Recrutamento", "service-recruitment", "RECRUTAMENTO"],
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <HeroMini title="Serviços" subtitle="Conheça todos os serviços que temos para si! A escolha acertada" image={defaultImages[0]} />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {cards.map(([label, target, eyebrow]) => (
          <button key={label} onClick={() => navigate(target)} className="cursor-pointer group overflow-hidden rounded-[30px] border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${defaultImages[(label.length + 1) % 3]})` }} />
            <div className="p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600">{eyebrow}</div>
              <h3 className="mt-3 text-2xl font-bold text-[#0f2f25]">{label}</h3>
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}

function EnergyPage() {
  return <ContentPage title="CERTIFICAÇÃO ENERGÉTICA" subtitle="A Certificação Energética classifica o desempenho energético de um imóvel numa escala de A+ a F e recomenda medidas de melhoria." sections={[["Certificação Energética", "Texto da certificação energética."], ["Validade", "Informação de validade."], ["O que determina a classe energética?", "Fatores que influenciam a classe energética."]]} />;
}

function EvaluationPage() {
  return <ContentPage title="AVALIAÇÃO DE IMÓVEIS" subtitle="Para avaliar um imóvel usado são tidas em conta informações como a zona geográfica, a natureza do imóvel, o tipo do imóvel, o seu estado, a sua área e o estado do mercado." sections={[["Avaliação de imóveis", "Texto introdutório."], ["Critérios de avaliação de um imóvel", "Critérios da avaliação."], ["Avaliadores de Imóveis", "Texto sobre avaliadores."], ["Documentos necessários", "Lista de documentos necessários."]]} />;
}

function RecruitmentPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <HeroMini title="Recrutamento" subtitle="Devido ao grande crescimento da empresa, estamos a recrutar Consultores Comerciais, para reforço da nossa equipa." image={defaultImages[2]} />
      <div className="mt-10 grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <CardBlock title="Perfil procurado">
          <p className="text-slate-700">Devido ao grande crescimento da empresa, estamos a recrutar Consultores Comerciais, para reforço da nossa equipa.</p>
          <ul className="mt-6 space-y-3 text-slate-700">
            {["Profissional com ou sem experiência comercial;", "Excelentes capacidades de comunicação;", "Vocação comercial e ambição pessoal;", "Gosto por trabalho em equipa;", "Disponibilidade total;", "Dinâmico, organizado, com espírito de iniciativa;", "Conhecimentos de informática na óptica do utilizador;"].map((item) => (
              <li key={item} className="flex items-start gap-3"><Check className="mt-1 text-emerald-600" size={18} /><span>{item}</span></li>
            ))}
          </ul>
        </CardBlock>

        <CardBlock title="Formulário de candidatura">
          <div className="grid gap-4 md:grid-cols-2">
            <input placeholder="Nome" className="rounded-2xl border border-slate-300 px-4 py-3" />
            <input placeholder="E-mail" className="rounded-2xl border border-slate-300 px-4 py-3" />
            <input placeholder="Telefone" className="rounded-2xl border border-slate-300 px-4 py-3" />
            <input placeholder="Localidade" className="rounded-2xl border border-slate-300 px-4 py-3" />
            <input placeholder="Escolaridade" className="rounded-2xl border border-slate-300 px-4 py-3" />
            <input placeholder="Link do Currículo" className="rounded-2xl border border-slate-300 px-4 py-3" />
            <input type="file" className="rounded-2xl border border-slate-300 px-4 py-3 md:col-span-2" />
            <textarea placeholder="Experiência profissional / Mais informações" rows={6} className="rounded-2xl border border-slate-300 px-4 py-3 md:col-span-2" />
          </div>
          <button className="cursor-pointer mt-5 rounded-2xl bg-[#0f2f25] px-6 py-3 font-semibold text-white">Enviar</button>
        </CardBlock>
      </div>
    </main>
  );
}

function ContactsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <HeroMini title="Contactos" subtitle="Estamos disponíveis para o ajudar a encontrar a melhor solução imobiliária" image={defaultImages[0]} />
      <div className="mt-10 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <CardBlock title="Informações">
          <InfoLine label="Morada" value="Rua Doutor Lopes Cardoso 56 4420-133 São Cosme" />
          <InfoLine label="Horário" value="09:00h às 12:30h e 14H00 às 18H30 (segunda a sexta) e das 09:30h às 13:30h (Sábados)" />
          <InfoLine label="Telefone" value="(+351) 221 178 825 (chamada para rede fixa nacional)" />
          <InfoLine label="Telemóvel" value="(+351) 910 376 833 (chamada para rede móvel nacional)" />
        </CardBlock>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[30px] bg-[#0f2f25] p-6 text-white shadow-sm">
            <h3 className="text-2xl font-bold">Fale Connosco</h3>
            <div className="mt-5 space-y-3">
              <input placeholder="Nome" className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 placeholder:text-white/60" />
              <input placeholder="E-mail" className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 placeholder:text-white/60" />
              <input placeholder="Telefone" className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 placeholder:text-white/60" />
              <input placeholder="Assunto" className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 placeholder:text-white/60" />
              <textarea placeholder="Observações" rows={5} className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 placeholder:text-white/60" />
              <button className="cursor-pointer w-full rounded-2xl bg-amber-400 px-4 py-3 font-semibold text-[#0f2f25]">Enviar</button>
            </div>
          </div>
          <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
            <iframe title="Mapa da imobiliária" src={`https://www.google.com/maps?q=${encodeURIComponent("Rua Doutor Lopes Cardoso 56 4420-133 São Cosme")}&output=embed`} className="h-full min-h-[520px] w-full" />
          </div>
        </div>
      </div>
    </main>
  );
}

function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <HeroMini title="QUEM SOMOS" subtitle="Sampaio Mediação Imobiliária atua no mercado imobiliário, compra e venda de imóveis, arrendamento e trespasses." image={defaultImages[1]} />
     <div className="mt-10 grid gap-8 xl:grid-cols-[1fr_0.9fr]">
  <RevealOnScroll>
    <CardBlock title="Sobre Nós">
      <ContentSection title="EMPRESA" text="A empresa conta com profissionais altamente qualificados e com ampla experiência na área, prontos para prestar um serviço de mediação personalizado, entendendo e interpretando as aspirações de cada cliente." />
      <ContentSection title="MISSÃO" text="Sampaio Mediação Imobiliária é uma empresa que busca conciliar os reais interesses de seus clientes/parceiros, de forma que consigam realizar os seus sonhos e atinjam os seus objetivos." />
      <section className="mb-10">
        <h3 className="mb-4 text-lg font-bold uppercase tracking-wide text-[#0f2f25]">VISÃO</h3>
        <p className="text-slate-700 leading-relaxed">Ser reconhecida como referência no sector imobiliário por sua eficiência e qualidade na busca do melhor para cada cliente, ser mais do que apenas um mediador, ser um parceiro necessário para aconselhamento e melhores decisões.</p>
        <p className="mt-4 text-slate-700 leading-relaxed">A nossa equipa de colaboradores é formada por profissionais experientes, com vasto conhecimento para sugerir as melhores alternativas. Além disso, dispomos de um sistema totalmente informatizado, o que permite uma maior agilidade na pesquisa e adequação do perfil do imóvel às solicitações do cliente.</p>
      </section>
    </CardBlock>
  </RevealOnScroll>

  <RevealOnScroll>
    <CardBlock title="NOSSOS CONSULTORES">
      <div className="grid gap-4 sm:grid-cols-2">
        {consultants.map((consultant) => (
          <div key={consultant.name} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 text-center">
            <img src={consultant.image} alt={consultant.name} className="mx-auto h-24 w-24 rounded-full object-cover" />
            <div className="mt-4 text-lg font-bold text-[#0f2f25]">{consultant.name}</div>
            <div className="mt-1 text-sm text-slate-600">{consultant.phone || "Número a definir"}</div>
            <a href={consultant.phone ? `https://wa.me/${consultant.phone.replace(/\D/g, "")}` : "#"} className="mt-4 inline-block rounded-full bg-[#0f2f25] px-4 py-2 text-sm font-semibold text-white">
              WhatsApp
            </a>
          </div>
        ))}
      </div>
    </CardBlock>
  </RevealOnScroll>
</div>
    </main>
  );
}

function TermsPage() {
  return <LegalPage title="Termos e Condições" blocks={[["1. ACORDO", "Texto dos termos."], ["2. MODIFICAÇÃO", "Texto dos termos."], ["3. REDIRECIONAMENTO", "Texto dos termos."]]} />;
}

function PrivacyPage() {
  return <LegalPage title="Política de Privacidade" blocks={[["1. DO QUE TRATA ESTA POLÍTICA?", "Texto da política."], ["2. O QUE SÃO DADOS PESSOAIS?", "Texto da política."], ["3. COMO VAMOS UTILIZAR OS SEUS DADOS PESSOAIS?", "Texto da política."]]} />;
}

function AdminPage({ loggedIn, setLoggedIn, properties, setProperties, openProperty }) {
 const emptyForm = {
  id: "",
  reference: "",
  title: "",
  description: "",
  district: "",
  county: "",
  parish: "",
  zone: "",
  state: "",
  nature: "",
  typology: "",
  businessType: "",
  price: "",
  bedrooms: "",
  innerBedrooms: "",
  bathrooms: "",
  floor: "",
  usefulArea: "",
  grossArea: "",
  energyClass: "",
  imagesText: "",
  videoUrl: "",
  location: "",

  hasVarandas: false,
  hasCozinha: false,

  surroundBanco: false,
  surroundEscola: false,
  surroundFarmacia: false,
  surroundGinasio: false,
  surroundMetro: false,
  surroundTransportes: false,
  surroundCentroCidade: false,
  surroundEspacosVerdes: false,

  equipElevador: false,

  serviceCozinhaEquipada: false,

  infraGaragem: false,
};

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [activeTab, setActiveTab] = useState("add");
  const [loginForm, setLoginForm] = useState({ user: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.user === "admin" && loginForm.password === "admin123") setLoggedIn(true);
    else alert("Use: admin / admin123");
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
  id: editingId || crypto.randomUUID(),
  reference: form.reference,
  title: form.title,
  description: form.description,
  district: form.district,
  county: form.county,
  parish: form.parish,
  zone: form.zone,
  state: form.state,
  nature: form.nature,
  typology: form.typology,
  businessType: form.businessType,
  price: Number(form.price || 0),
  bedrooms: Number(form.bedrooms || 0),
  innerBedrooms: Number(form.innerBedrooms || 0),
  bathrooms: Number(form.bathrooms || 0),
  floor: Number(form.floor || 0),
  usefulArea: Number(form.usefulArea || 0),
  grossArea: Number(form.grossArea || 0),
  energyClass: form.energyClass,
  images: form.imagesText.split("\n").map((x) => x.trim()).filter(Boolean).length
    ? form.imagesText.split("\n").map((x) => x.trim()).filter(Boolean)
    : defaultImages,
  videoUrl: form.videoUrl,
  location: form.location,

  divisions: {
    varandas: form.hasVarandas,
    cozinha: form.hasCozinha,
  },

  surroundings: {
    banco: form.surroundBanco,
    escola: form.surroundEscola,
    farmacia: form.surroundFarmacia,
    ginasio: form.surroundGinasio,
    metro: form.surroundMetro,
    transportes: form.surroundTransportes,
    centroCidade: form.surroundCentroCidade,
    espacosVerdes: form.surroundEspacosVerdes,
  },

  equipments: {
    elevador: form.equipElevador,
  },

  services: {
    cozinhaEquipada: form.serviceCozinhaEquipada,
  },

  infrastructure: {
    garagem: form.infraGaragem,
  },
};

    setProperties((prev) => {
      const exists = prev.some((p) => p.id === payload.id);
      return exists ? prev.map((p) => (p.id === payload.id ? payload : p)) : [payload, ...prev];
    });

    alert(editingId ? "Imóvel atualizado com sucesso." : "Imóvel adicionado com sucesso.");
    resetForm();
    setActiveTab("list");
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja deletar este imóvel?")) setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEdit = (property) => {
    setEditingId(property.id);
    setForm({
      id: property.id,
      reference: property.reference,
      title: property.title,
      description: property.description,
      district: property.district,
      county: property.county,
      parish: property.parish,
      zone: property.zone,
      state: property.state,
      nature: property.nature,
      typology: property.typology,
      businessType: property.businessType,
      price: property.price,
      bedrooms: property.bedrooms,
      innerBedrooms: property.innerBedrooms,
      bathrooms: property.bathrooms,
      floor: property.floor,
      usefulArea: property.usefulArea,
      grossArea: property.grossArea,
      energyClass: property.energyClass,
      imagesText: (property.images || []).join("\n"),
      videoUrl: property.videoUrl,
      location: property.location,
      hasVarandas: !!property.divisions?.varandas,
      hasCozinha: !!property.divisions?.cozinha,
      surroundBanco: !!property.surroundings?.banco,
      surroundEscola: !!property.surroundings?.escola,
      surroundFarmacia: !!property.surroundings?.farmacia,
      surroundGinasio: !!property.surroundings?.ginasio,
      surroundMetro: !!property.surroundings?.metro,
      surroundTransportes: !!property.surroundings?.transportes,
      surroundCentroCidade: !!property.surroundings?.centroCidade,
      surroundEspacosVerdes: !!property.surroundings?.espacosVerdes,
      equipElevador: !!property.equipments?.elevador,
      serviceCozinhaEquipada: !!property.services?.cozinhaEquipada,
      infraGaragem: !!property.infrastructure?.garagem,
    });
    setActiveTab("add");
  };

  if (!loggedIn) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 md:px-6">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-[#0f2f25]"><LogIn size={28} /></div>
          <h1 className="mt-5 text-center text-3xl font-bold text-[#0f2f25]">Área do Corretor</h1>
          <p className="mt-2 text-center text-slate-600">Faça login para gerir os imóveis do site.</p>
          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <input value={loginForm.user} onChange={(e) => setLoginForm({ ...loginForm, user: e.target.value })} placeholder="Utilizador" className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
            <input type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} placeholder="Palavra-passe" className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
            <button className="cursor-pointer w-full rounded-2xl bg-[#0f2f25] px-4 py-3 font-semibold text-white">Entrar</button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-[#0f2f25]">Painel do Corretor</h1>
          <p className="mt-2 text-slate-600">Adicione, edite ou elimine imóveis. O site público atualiza automaticamente via localStorage.</p>
        </div>
        <button onClick={() => setLoggedIn(false)} className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700"><LogOut size={16} /> Sair</button>
      </div>

      <div className="mb-6 flex gap-2">
        <button onClick={() => setActiveTab("add")} className={classNames("cursor-pointer rounded-full px-4 py-2 text-sm font-semibold", activeTab === "add" ? "bg-[#0f2f25] text-white" : "bg-slate-100 text-slate-700")}>{editingId ? "Editar imóvel" : "Adicionar imóvel"}</button>
        <button onClick={() => setActiveTab("list")} className={classNames("cursor-pointer rounded-full px-4 py-2 text-sm font-semibold", activeTab === "list" ? "bg-[#0f2f25] text-white" : "bg-slate-100 text-slate-700")}>Imóveis</button>
      </div>

      {activeTab === "add" && (
        <form onSubmit={handleSubmit} className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
  <Input value={form.reference} onChange={(v) => setForm({ ...form, reference: v })} label="Referência" />
  <Input value={form.title} onChange={(v) => setForm({ ...form, title: v })} label="Nome do imóvel" />
  <Input value={form.typology} onChange={(v) => setForm({ ...form, typology: v })} label="Tipologia" />

  <Select label="Distrito" value={form.district} onChange={(v) => setForm({ ...form, district: v })} options={DISTRICTS} />
  <Select label="Concelho" value={form.county} onChange={(v) => setForm({ ...form, county: v })} options={COUNTIES} />
  <Select label="Freguesia" value={form.parish} onChange={(v) => setForm({ ...form, parish: v })} options={PARISHES} />

  <Select label="Zona" value={form.zone} onChange={(v) => setForm({ ...form, zone: v })} options={ZONES} />
  <Select label="Estado" value={form.state} onChange={(v) => setForm({ ...form, state: v })} options={PROPERTY_STATES} />
  <Select label="Natureza" value={form.nature} onChange={(v) => setForm({ ...form, nature: v })} options={NATURES} />

  <Select label="Negócio" value={form.businessType} onChange={(v) => setForm({ ...form, businessType: v })} options={BUSINESS_TYPES} />
  <Input type="number" value={form.price} onChange={(v) => setForm({ ...form, price: v })} label="Valor" />
  <Select label="Categoria energética" value={form.energyClass} onChange={(v) => setForm({ ...form, energyClass: v })} options={ENERGY_CLASSES} />

  <Input type="number" value={form.bathrooms} onChange={(v) => setForm({ ...form, bathrooms: v })} label="Casas de banho" />
  <Input type="number" value={form.innerBedrooms} onChange={(v) => setForm({ ...form, innerBedrooms: v })} label="Quartos interiores" />
  <Input type="number" value={form.bedrooms} onChange={(v) => setForm({ ...form, bedrooms: v })} label="Total de quartos" />

  <Input type="number" value={form.floor} onChange={(v) => setForm({ ...form, floor: v })} label="Piso" />
  <Input type="number" value={form.usefulArea} onChange={(v) => setForm({ ...form, usefulArea: v })} label="Área útil" />
  <Input type="number" value={form.grossArea} onChange={(v) => setForm({ ...form, grossArea: v })} label="Área bruta" />

  <div className="md:col-span-2 xl:col-span-3">
    <label className="mb-2 block text-sm font-semibold text-slate-700">Descrição</label>
    <textarea
      value={form.description}
      onChange={(e) => setForm({ ...form, description: e.target.value })}
      rows={5}
      className="w-full rounded-2xl border border-slate-300 px-4 py-3"
    />
  </div>

  <div className="md:col-span-2 xl:col-span-3">
    <label className="mb-2 block text-sm font-semibold text-slate-700">Fotos (uma URL por linha)</label>
    <textarea
      value={form.imagesText}
      onChange={(e) => setForm({ ...form, imagesText: e.target.value })}
      rows={4}
      className="w-full rounded-2xl border border-slate-300 px-4 py-3"
    />
  </div>

  <Input value={form.videoUrl} onChange={(v) => setForm({ ...form, videoUrl: v })} label="URL do vídeo" />
  <Input value={form.location} onChange={(v) => setForm({ ...form, location: v })} label="Localização / morada" />
</div>
<div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
  <CheckboxGroup
    title="Divisões"
    items={[
      ["Varandas", "hasVarandas"],
      ["Cozinha", "hasCozinha"],
    ]}
    form={form}
    setForm={setForm}
  />

  <CheckboxGroup
    title="Zona Envolvente"
    items={[
      ["Banco", "surroundBanco"],
      ["Escola", "surroundEscola"],
      ["Farmácia", "surroundFarmacia"],
      ["Ginásio", "surroundGinasio"],
      ["Metro", "surroundMetro"],
      ["Transportes Públicos", "surroundTransportes"],
      ["Centro da Cidade", "surroundCentroCidade"],
      ["Espaços Verdes", "surroundEspacosVerdes"],
    ]}
    form={form}
    setForm={setForm}
  />

  <CheckboxGroup
    title="Equipamentos / Serviços / Infraestrutura"
    items={[
      ["Elevador", "equipElevador"],
      ["Cozinha equipada", "serviceCozinhaEquipada"],
      ["Garagem", "infraGaragem"],
    ]}
    form={form}
    setForm={setForm}
  />
</div>
<div className="mt-8 flex flex-wrap gap-3">
  <button className="cursor-pointer inline-flex items-center gap-2 rounded-2xl bg-[#0f2f25] px-6 py-3 font-semibold text-white">
    <Plus size={18} /> {editingId ? "Atualizar imóvel" : "Adicionar o imóvel"}
  </button>

  {editingId && (
    <button
      type="button"
      onClick={resetForm}
      className="cursor-pointer rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-700"
    >
      Cancelar edição
    </button>
  )}
</div>
        </form>
      )}

      {activeTab === "list" && (
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-[#0f2f25]">Imóveis disponíveis</h2>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {properties.map((property) => (
              <div key={property.id} className="overflow-hidden rounded-[24px] border border-slate-200">
                <img src={property.images?.[0] || defaultImages[0]} alt={property.title} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">{property.reference}</div>
                  <h3 className="mt-2 text-lg font-bold text-[#0f2f25]">{property.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">{property.description}</p>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => handleEdit(property)} className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700"><Pencil size={16} /> Editar</button>
                    <button onClick={() => handleDelete(property.id)} className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600"><Trash2 size={16} /> Deletar</button>
                    <button onClick={() => openProperty(property.id)} className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">Ver</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

function PropertyFilters({ filters, setFilters, compact = false }) {
  const wrapper = compact ? "grid gap-3 md:grid-cols-2" : "grid gap-3";
  return (
    <div className={wrapper}>
      <Select label="Tipo de Imóvel" value={filters.type} onChange={(v) => setFilters({ ...filters, type: v })} options={PROPERTY_TYPES} />
      <Select label="Distrito" value={filters.district} onChange={(v) => setFilters({ ...filters, district: v })} options={DISTRICTS} />
      <Select label="Concelho" value={filters.county} onChange={(v) => setFilters({ ...filters, county: v })} options={COUNTIES} />
      <Select label="Freguesia" value={filters.parish} onChange={(v) => setFilters({ ...filters, parish: v })} options={PARISHES} />
      <Select label="Zona" value={filters.zone} onChange={(v) => setFilters({ ...filters, zone: v })} options={ZONES} />
      <Select label="Negócio" value={filters.businessType} onChange={(v) => setFilters({ ...filters, businessType: v })} options={BUSINESS_TYPES} />
      <Select label="Estado" value={filters.state} onChange={(v) => setFilters({ ...filters, state: v })} options={PROPERTY_STATES} />
      <Select label="Quartos" value={filters.bedrooms} onChange={(v) => setFilters({ ...filters, bedrooms: v })} options={["0", "1", "2", "3", "4", "5", "6"]} />
      <Input label="Preço mínimo (€)" type="number" value={filters.minPrice} onChange={(v) => setFilters({ ...filters, minPrice: v })} />
      <Input label="Preço máximo (€)" type="number" value={filters.maxPrice} onChange={(v) => setFilters({ ...filters, maxPrice: v })} />
      <Input label="Área mínima (m²)" type="number" value={filters.minArea} onChange={(v) => setFilters({ ...filters, minArea: v })} />
      <Input label="Área máxima (m²)" type="number" value={filters.maxArea} onChange={(v) => setFilters({ ...filters, maxArea: v })} />
    </div>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="mt-16 bg-[#0f2f25] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:px-6 lg:grid-cols-[1fr_1fr_1fr]">
        <div>
          <div className="text-2xl font-bold">SAMPAIO</div>
          <div className="text-sm uppercase tracking-[0.25em] text-amber-300">Mediação Imobiliária</div>
          <div className="mt-5 flex gap-3">
            <a href="https://www.facebook.com/sampaiomediacaoimobiliaria" className="rounded-full bg-white/10 p-3 hover:bg-white/20"><span className="text-sm font-bold">f</span></a>
            <a href="https://www.instagram.com/sampaiomediacaoimobiliaria" className="rounded-full bg-white/10 p-3 hover:bg-white/20"><span className="text-sm font-bold">i</span></a>
            <a href="https://wa.me/351910037055" className="rounded-full bg-white/10 p-3 hover:bg-white/20"><MessageCircle size={18} /></a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold text-amber-300">Links úteis</h4>
          <div className="mt-4 flex flex-col gap-2 text-sm text-slate-200">
            <button onClick={() => navigate("terms")} className="cursor-pointer text-left hover:text-amber-300">Termos e condições</button>
            <button onClick={() => navigate("privacy")} className="cursor-pointer text-left hover:text-amber-300">Política de Privacidade</button>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold text-amber-300">Informação</h4>
          <div className="mt-4 space-y-2 text-sm text-slate-200">
            <p>PyramidExclusive Unipessoal LDA / AMI 19157</p>
            <p>CRM e Sites Imobiliários por eGO Real Estate</p>
            <p>Estamos no SUPERCASA</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ActionCard({ title, image, onClick }) {
  return (
    <button onClick={onClick} className="cursor-pointer group relative overflow-hidden rounded-[30px] text-left shadow-sm">
      <div className="h-[340px] bg-cover bg-center transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${image})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-8 text-white">
        <h3 className="text-3xl font-bold">{title}</h3>
      </div>
    </button>
  );
}

function PropertyCard({ property, onClick, dark = false }) {
  return (
    <button onClick={onClick} className={classNames("cursor-pointer overflow-hidden rounded-[28px] border text-left transition hover:-translate-y-1 hover:shadow-xl", dark ? "border-white/10 bg-white/5 text-white backdrop-blur" : "border-slate-200 bg-white shadow-sm")}>
      <img src={property.images?.[0] || defaultImages[0]} alt={property.title} className="h-56 w-full object-cover" />
      <div className="p-5">
        <div className={classNames("text-xs font-semibold uppercase tracking-[0.2em]", dark ? "text-amber-300" : "text-amber-600")}>{property.reference}</div>
        <h3 className={classNames("mt-2 text-xl font-bold", dark ? "text-white" : "text-[#0f2f25]")}>{property.title}</h3>
        <p className={classNames("mt-3 line-clamp-2 text-sm leading-6", dark ? "text-slate-200" : "text-slate-600")}>{property.description}</p>
        <div className={classNames("mt-5 flex flex-wrap gap-3 text-sm", dark ? "text-slate-200" : "text-slate-600")}>
          <span className="inline-flex items-center gap-1"><BedDouble size={16} /> {property.bedrooms}</span>
          <span className="inline-flex items-center gap-1"><Bath size={16} /> {property.bathrooms}</span>
          <span className="inline-flex items-center gap-1"><Square size={16} /> {property.grossArea} m²</span>
        </div>
        <div className={classNames("mt-5 text-lg font-bold", dark ? "text-white" : "text-[#0f2f25]")}>{formatPrice(property.price, property.businessType)}</div>
      </div>
    </button>
  );
}

function SectionHeading({ title, subtitle, light = false }) {
  return (
    <div>
      <h2 className={classNames("text-3xl font-bold md:text-4xl", light ? "text-white" : "text-[#0f2f25]")}>{title}</h2>
      <p className={classNames("mt-3 max-w-2xl text-base leading-7", light ? "text-slate-200" : "text-slate-600")}>{subtitle}</p>
    </div>
  );
}

function HeroMini({ title, subtitle, image }) {
  return (
    <section className="relative overflow-hidden rounded-[34px]">
      <div className="h-[280px] bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#082119]/85 via-[#082119]/60 to-[#082119]/40" />
      <div className="absolute inset-0 flex items-end p-8 md:p-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
          <p className="mt-3 text-base leading-7 text-slate-200">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}

function CardBlock({ title, children }) {
  return (
    <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-bold text-[#0f2f25]">{title}</h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</div>
      <div className="mt-2 font-semibold text-[#0f2f25]">{value}</div>
    </div>
  );
}

function Accordion({ title, open, onToggle, children }) {
  return (
    <div className="mb-3 overflow-hidden rounded-2xl border border-slate-200">
      <button onClick={onToggle} className="cursor-pointer flex w-full items-center justify-between bg-slate-50 px-4 py-4 text-left font-semibold text-[#0f2f25]">
        {title}
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && <div className="space-y-3 p-4">{children}</div>}
    </div>
  );
}

function FeatureCheck({ label, checked }) {
  return <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3"><span>{label}</span><span>{checked ? "✔" : "—"}</span></div>;
}

function FeatureRow({ label, value }) {
  return <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3"><span>{label}</span><strong>{value}</strong></div>;
}

function EmptyState({ text }) {
  return <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">{text}</div>;
}

function ContentPage({ title, subtitle, sections }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <HeroMini title={title} subtitle={subtitle} image={defaultImages[1]} />
      <div className="mt-10 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="space-y-8">
          {sections.map(([sectionTitle, text]) => <ContentSection key={sectionTitle} title={sectionTitle} text={text} />)}
        </div>
      </div>
    </main>
  );
}

function ContentSection({ title, text }) {
  return (
    <section className="mb-10">
      <h3 className="mb-4 text-lg font-bold uppercase tracking-wide text-[#0f2f25]">{title}</h3>
      <p className="text-slate-700 leading-relaxed">{text}</p>
    </section>
  );
}

function LegalPage({ title, blocks }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <HeroMini title={title} subtitle="Documento informativo e institucional" image={defaultImages[0]} />
      <div className="mt-10 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="space-y-8">
          {blocks.map(([heading, text]) => <ContentSection key={heading} title={heading} text={text} />)}
        </div>
      </div>
    </main>
  );
}

function InfoLine({ label, value }) {
  return (
    <div className="mb-5">
      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</div>
      <div className="mt-2 leading-7 text-slate-700">{value}</div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div>
      {label && <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>}
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#0f2f25]" />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      {label && <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>}
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#0f2f25]">
        <option value="">Selecione</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  );
}

function CheckboxGroup({ title, items, form, setForm }) {
  return (
    <div className="rounded-[24px] border border-slate-200 p-5">
      <h3 className="mb-4 text-lg font-bold text-[#0f2f25]">{title}</h3>
      <div className="space-y-3">
        {items.map(([label, key]) => (
          <label
            key={key}
            className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
          >
            <span>{label}</span>
            <input
              type="checkbox"
              checked={!!form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export default App;
