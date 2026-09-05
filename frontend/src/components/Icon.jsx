import {
  FiCode, FiServer, FiDatabase, FiCloud, FiPenTool, FiLayers, FiUsers,
  FiBriefcase, FiAward, FiStar, FiCpu, FiSmartphone, FiShield, FiZap,
  FiTrendingUp, FiGlobe, FiTool, FiLifeBuoy, FiRefreshCw, FiBox,
  FiGitBranch, FiLink, FiFolder, FiFeather,
  FiCheckCircle, FiThumbsUp, FiHeart, FiTerminal, FiLock, FiMenu,
  FiMail, FiMapPin, FiPhone, FiGithub, FiLinkedin, FiTwitter, FiArrowUp,
  FiExternalLink, FiArrowRight, FiArrowLeft, FiCalendar, FiClock,
  FiDownload, FiSend, FiEye, FiUser, FiPlus, FiEdit2, FiTrash2, FiLayout,
  FiKey, FiLogOut
} from 'react-icons/fi';

const FALLBACK = FiCode;

const MAP = {
  code: FiCode, server: FiServer, database: FiDatabase, cloud: FiCloud,
  tool: FiTool, theme: FiPenTool, palette: FiPenTool, design: FiPenTool,
  idea: FiFeather, lightbulb: FiFeather, layers: FiLayers, users: FiUsers,
  briefcase: FiBriefcase, award: FiAward, star: FiStar, cpu: FiCpu,
  smartphone: FiSmartphone, shield: FiShield, zap: FiZap,
  trending: FiTrendingUp, globe: FiGlobe, lifebuoy: FiLifeBuoy,
  refresh: FiRefreshCw, box: FiBox, git: FiGitBranch, link: FiLink,
  folder: FiFolder, trophy: FiAward, check: FiCheckCircle,
  thumbs: FiThumbsUp, heart: FiHeart, terminal: FiTerminal, lock: FiLock,
  github: FiGithub, linkedin: FiLinkedin, twitter: FiTwitter, mail: FiMail,
  map: FiMapPin, phone: FiPhone, arrowUp: FiArrowUp, external: FiExternalLink,
  right: FiArrowRight, left: FiArrowLeft, calendar: FiCalendar, clock: FiClock,
  download: FiDownload, send: FiSend, eye: FiEye, user: FiUser, plus: FiPlus,
  edit: FiEdit2, trash: FiTrash2, layout: FiLayout, key: FiKey, logout: FiLogOut,
};

export default function Icon({ name, ...props }) {
  const Cmp = MAP[(name || '').toLowerCase()] || FALLBACK;
  return <Cmp {...props} />;
}
