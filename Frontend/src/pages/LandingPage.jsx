import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Container } from "../components/ui/Container.jsx";

const newsItems = [
  {
    title: "Annual Science Fair Winners Announced",
    description:
      "Congratulations to our Grade 8 students for taking first place in the regional competition.",
    date: "NOV 12",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAi1k5UKYar7DNGHJrvt9JSGup5zQe_PAzmjWShGAFvUT9TS4bo8YjgHKpefrmsSFqM1ZDsJyAqHqvOlUg1Dlp6o7AB8OVeCWqyIDjfx-ZqIq5XdLqiQubxkoJo5p3iisdBPX76kcpE_sDQeMzxHdnYkrur2j6jIKL6KCF5Obr8Fv-kTP6vicx2r6dcPFR-FVrq471D-X-crXLDO2JfktC0GxNz5GLiywRV1FpW7VnI0vG24wBhlamNo6ErfpjxFE-gjep21R57FAO7"
  },
  {
    title: "Varsity Basketball Season Opener",
    description:
      "Join us in the gymnasium this Friday to support our Eagles as they start the season.",
    date: "NOV 10",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCedfKuCeO_4HMi9Uaa82fW7IOUEyoZoThEB7DIZ7K6Va3M1ArA9APTtQO_Nv-nDJsQvhjPTuAJ1UoUwBg9M_WDz3-KERWmXAO-imqCPrGtfk8zWQkEUdHR3UHwp91k9W_kLgW3rKLXz7M-bAZudYByqTdUbWshuTPHW-njcnsDapAhuaESK3FeXpHspoSQSZwKh2UfXFNgJ-6uNb0z6e7JiULKkAlibKvNPwVlrv4wsrzJwtlqwa2kkK4vFYINIOtWICI-E9vN_3jX"
  }
];

const whyCards = [
  {
    title: "Academic Excellence",
    description:
      "Rigorous curriculum designed to prepare students for top-tier higher education with a focus on critical thinking and innovation.",
    icon: "psychology",
    accentClass: "bg-sjcs-blue/10 text-sjcs-blue"
  },
  {
    title: "Faith Formation",
    description:
      "Daily integration of spiritual values, mass, and retreats to help students grow in their faith and moral character.",
    icon: "church",
    accentClass: "bg-sjcs-red/10 text-sjcs-red"
  },
  {
    title: "Community & Service",
    description:
      "A vibrant community that encourages service learning, athletics, and arts to develop well-rounded individuals.",
    icon: "groups",
    accentClass: "bg-sjcs-blue/10 text-sjcs-blue"
  }
];

const LandingPage = () => {
  return (
    <div className="bg-sjcs-gray text-sjcs-textPrimary">
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sjcs-gradient text-white shadow-sjcs-soft">
              <span className="text-lg font-bold">SJ</span>
              <Link to="/"><img src="/sjcs_logo.png" alt="School Logo"/></Link>
            </div>
            <span className="hidden text-xl font-bold text-sjcs-textPrimary sm:block">SJCS Portal</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            {["Home", "About Us", "Academics", "Admissions"].map((item) => (
              <Link
                key={item}
                className="text-sm font-medium text-sjcs-textSecondary transition-colors hover:text-sjcs-blue"
                to="/"
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Link
              className="hidden text-sm font-semibold text-sjcs-blue hover:opacity-80 sm:inline-flex"
              to="/login"
            >
              Parent Login
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-lg bg-sjcs-blue px-5 py-2 text-sm font-semibold text-white shadow-sjcs-soft transition hover:opacity-90"
              to="/role-selection"
            >
              Apply Now
            </Link>
          </div>
        </Container>
      </nav>

      <section className="relative overflow-hidden bg-sjcs-gradient">
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }} />
        <Container className="relative flex flex-col items-center px-4 pb-24 pt-20 text-center md:pb-32 md:pt-28">
          <motion.span
            className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-sjcs-red" />
            Now Accepting Applications for Fall 2024
          </motion.span>
          <motion.h1
            className="mb-6 text-4xl font-bold tracking-tight text-white drop-shadow-sm md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Saint Joseph Catholic School
          </motion.h1>
          <motion.p
            className="mb-8 text-xl font-light italic text-blue-100 md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            "Faith, Excellence, Service"
          </motion.p>
          <motion.p
            className="mb-10 max-w-3xl text-lg text-blue-50/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Empowering students to achieve academic excellence and spiritual growth in a
            supportive community environment. Manage your education journey with our
            comprehensive digital platform.
          </motion.p>
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Link
              className="flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3.5 font-bold text-sjcs-blue shadow-sjcs-soft transition hover:scale-105"
              to="/role-selection"
            >
              <span className="material-icons text-xl">school</span>
              Apply for Admission
            </Link>
            <Link
              className="flex items-center justify-center gap-2 rounded-lg border border-white/40 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              to="/login"
            >
              <span className="material-icons text-xl">login</span>
              Student Portal
            </Link>
          </div>
        </Container>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block h-[60px] w-[calc(100%+1.3px)]"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-sjcs-gray"
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            />
          </svg>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-sjcs-blue/10 blur-xl" />
              <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-2xl">
                <img
                  alt="Students studying in a modern library"
                  className="absolute inset-0 h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOVayzqFZZDuBCLq3U2fHDfm7NCpG_YQtp-mpHtrgbAqHQOtdD_cnTk8htxl9YaO4yB3Xri8dPeLHa3hgSgDv-m2uGAOi9FBJ12TUjH1JERDtC3kSDkSiGIDW7Yx3f8_boW7CLELm4oo4UaTY8F_4PHzawvuhFyhO6jOdBGzbO9MdwFHSZpSnB8vPbKlrnM9kUy147hav_QNR6y9BK5IG2-1DJhLeJvzziZ7BrEJnIQZm-OY-iPESpN8v83bXD753d8xvUaI__Na2m"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-lg font-bold">Founded in 1954</p>
                  <p className="text-sm text-white/80">70 Years of Excellence</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 hidden max-w-xs rounded-xl border border-slate-100 bg-white p-6 shadow-xl md:block">
                <div className="mb-3 flex items-center gap-4">
                  <div className="rounded-lg bg-sjcs-red/10 p-3 text-sjcs-red">
                    <span className="material-icons">diversity_3</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-sjcs-textPrimary">12:1</p>
                    <p className="text-xs font-semibold uppercase tracking-wider text-sjcs-textSecondary">
                      Student-Teacher Ratio
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:pl-10">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-sjcs-blue">
                About The School
              </h2>
              <h3 className="mb-6 text-3xl font-bold text-sjcs-textPrimary md:text-4xl">
                Nurturing Minds, <br />Strengthening Spirits.
              </h3>
              <p className="mb-6 text-lg text-sjcs-textSecondary">
                At Saint Joseph Catholic School, we believe education goes beyond textbooks.
                Our mission is to cultivate a learning environment where academic rigor meets
                moral development.
              </p>
              <p className="mb-8 text-sjcs-textSecondary">
                We provide a comprehensive curriculum that challenges students to think
                critically while instilling values of compassion, integrity, and service to
                others.
              </p>
              <ul className="mb-8 space-y-4">
                {[
                  "Accredited by the Catholic School Association",
                  "State-of-the-art STEM Facilities",
                  "Comprehensive Arts & Athletics Programs"
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="material-icons mr-3 mt-0.5 text-sjcs-blue">check_circle</span>
                    <span className="text-sjcs-textPrimary">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                className="inline-flex items-center font-semibold text-sjcs-blue hover:opacity-80"
                to="/"
              >
                Read our full mission statement
                <span className="material-icons ml-2 text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-sjcs-textPrimary">Why Choose SJCS?</h2>
            <p className="text-sjcs-textSecondary">
              Our holistic approach ensures every child finds their path to success through
              academics, faith, and community.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {whyCards.map((card, index) => (
              <motion.div
                key={card.title}
                className="group rounded-xl border border-slate-200 bg-sjcs-gray p-8 transition-all duration-300 hover:-translate-y-1 hover:border-sjcs-blue/40 hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-lg ${card.accentClass}`}>
                  <span className="material-icons text-3xl">{card.icon}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-sjcs-textPrimary">{card.title}</h3>
                <p className="mb-4 text-sjcs-textSecondary">{card.description}</p>
                <Link className="text-sm font-semibold text-sjcs-blue" to="/">
                  Learn more
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-bold text-sjcs-textPrimary">Latest from SJCS</h2>
              <p className="mt-2 text-sjcs-textSecondary">Keep up with school news and upcoming events.</p>
            </div>
            <Link className="inline-flex items-center text-sjcs-blue hover:opacity-80" to="/">
              View all news
              <span className="material-icons ml-1 text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {newsItems.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white transition-shadow hover:shadow-md"
              >
                <div className="relative h-40 bg-slate-200">
                  <img alt={item.title} className="h-full w-full object-cover" src={item.image} />
                  <div className="absolute right-2 top-2 rounded bg-sjcs-blue px-2 py-1 text-xs font-bold text-white">
                    {item.date}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-bold text-sjcs-textPrimary">
                    {item.title}
                  </h3>
                  <p className="text-sm text-sjcs-textSecondary">
                    {item.description}
                  </p>
                  <Link className="mt-3 inline-block text-xs font-semibold uppercase tracking-wide text-sjcs-blue" to="/">
                    Read More
                  </Link>
                </div>
              </article>
            ))}
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white lg:col-span-2">
              <div className="absolute right-0 top-0 p-8 opacity-10">
                <span className="material-icons text-9xl">notifications</span>
              </div>
              <h3 className="relative z-10 mb-4 flex items-center gap-2 text-xl font-bold">
                <span className="material-icons text-sjcs-warning">campaign</span>
                Important Notices
              </h3>
              <ul className="relative z-10 space-y-4">
                <li className="border-b border-white/10 pb-3">
                  <p className="text-xs font-bold text-sjcs-warning">DUE: NOV 20</p>
                  <p className="text-sm font-medium">
                    Re-enrollment forms for the 2025 academic year are due next week. Please login
                    to the parent portal.
                  </p>
                </li>
                <li className="border-b border-white/10 pb-3 last:border-0">
                  <p className="text-xs font-bold text-blue-300">EVENT: DEC 05</p>
                  <p className="text-sm font-medium">
                    Christmas Charity Drive begins. Drop off non-perishable items at the main office.
                  </p>
                </li>
              </ul>
              <div className="mt-6 border-t border-white/10 pt-4">
                <Link
                  className="inline-flex w-full items-center justify-center rounded bg-sjcs-blue py-2 text-sm font-semibold"
                  to="/login"
                >
                  Login to Portal
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-sjcs-blue/10 bg-sjcs-blue/5 py-20">
        <Container className="text-center">
          <h2 className="mb-6 text-3xl font-bold text-sjcs-textPrimary md:text-4xl">
            Ready to Join the SJCS Family?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-sjcs-textSecondary">
            Begin your application process today. Our admissions team is here to guide you every
            step of the way.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              className="rounded-lg bg-sjcs-blue px-8 py-3 font-bold text-white shadow-sjcs-soft transition hover:-translate-y-0.5"
              to="/role-selection"
            >
              Start Application
            </Link>
            <Link
              className="rounded-lg border border-slate-200 bg-white px-8 py-3 font-bold text-sjcs-textPrimary transition hover:bg-slate-50"
              to="/"
            >
              Schedule a Tour
            </Link>
          </div>
        </Container>
      </section>

      <footer className="border-t border-slate-800 bg-slate-900 py-12 text-slate-300">
        <Container>
          <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-sjcs-gradient text-xs font-bold text-white">
                  SJ
                </div>
                <span className="text-lg font-bold text-white">Saint Joseph Catholic School</span>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-slate-400">
                Providing a foundation of faith and academic excellence since 1954. Educating the
                whole child for a lifetime of success.
              </p>
              <div className="flex space-x-4">
                {["facebook", "instagram"].map((platform) => (
                  <Link
                    key={platform}
                    className="text-slate-400 transition-colors hover:text-white"
                    to="/"
                  >
                    <span className="sr-only">{platform}</span>
                    <span className="material-icons">public</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                {["School Calendar", "Staff Directory", "Parent Resources", "Alumni Network", "Careers"].map((item) => (
                  <li key={item}>
                    <Link className="transition-colors hover:text-sjcs-blue" to="/">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Admissions</h4>
              <ul className="space-y-3 text-sm">
                {["Application Process", "Tuition & Aid", "Visit SJCS", "International Students"].map((item) => (
                  <li key={item}>
                    <Link className="transition-colors hover:text-sjcs-blue" to="/">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Contact Us</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="material-icons text-sjcs-blue">place</span>
                  <span>123 Saint Joseph Way, Springfield, ST 12345</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-icons text-sjcs-blue">phone</span>
                  <span>(555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-icons text-sjcs-blue">email</span>
                  <span>admissions@sjcs.edu</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-sm text-slate-500 md:flex-row">
            <p>© 2024 Saint Joseph Catholic School. All rights reserved.</p>
            <div className="flex gap-6">
              <Link className="transition-colors hover:text-white" to="/">
                Privacy Policy
              </Link>
              <Link className="transition-colors hover:text-white" to="/">
                Terms of Use
              </Link>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;
