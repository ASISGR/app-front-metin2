import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DashboardView from '@/views/DashboardView.vue';
import AccountDataHandle from '@/views/AccountDataHandleView.vue';
import RegisterView from '@/views/RegisterView.vue';
import NewsView from '@/views/NewsView.vue';
import BonusView from '@/views/BonusView.vue';
import DownloadView from '@/views/DownloadView.vue';
import RankingPlayersView from '@/views/RankingPlayersView.vue';
import RankingGuildsView from '@/views/RankingGuildsView.vue';
import ForgotPasswordView from '@/views/ForgotPasswordView.vue';
import CredentialsManageView from '@/views/CredentialsManageView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: HomeView,
    },
    {
      path: '/dashboard',
      name: 'dashboard-page',
      component: DashboardView,
    },
    {
      path: '/account-handeling',
      name: 'account-data-handeling-page',
      component: AccountDataHandle,
    },
    {
      path: '/register',
      name: 'register-page',
      component: RegisterView,
    },
    {
      path: '/news',
      name: 'news-page',
      component: NewsView,
    },
    {
      path: '/download',
      name: 'download-page',
      component: DownloadView,
    },

    {
      path: '/bonus',
      name: 'bonus-page',
      component: BonusView,
    },
    {
      path: '/players/:index',
      name: 'players-ranking',
      component: RankingPlayersView,
    },
    {
      path: '/guilds/:index',
      name: 'guilds-ranking',
      component: RankingGuildsView,
    },
    {
      path: '/forgot-password',
      name: 'forgot',
      component: ForgotPasswordView,
    },
    {
      path: '/account-manage',
      name: 'credentials-manage',
      component: CredentialsManageView,
    },
  ],
});

export default router;
