import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export const SidebarDataE = [
  {
    title: 'Main',
    icon: <HomeIcon />,
    link: '/EstudianteMain',
  },
  {
    title: 'Editar datos personales',
    icon: <EditIcon />,
    link: '/Editar',
  },
  {
    title: 'Reporte Evaluaciones',
    icon: <SearchIcon />,
    link: '/ReporteEvaluaciones',
  },
  {
    title: 'Ver Reclamos',
    icon: <NotificationsActiveIcon />,
    link: '/MisReclamos',
  },
];
