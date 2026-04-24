import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useAura } from '../context/AuraContext';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Award, Zap } from 'lucide-react';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

const AnalyticsCard = ({ title, value, icon: Icon, chart: ChartComponent }) => {
  const { speak, stop } = useAura();
  
  return (
    <motion.div 
      className="glass-card"
      whileHover={{ y: -10 }}
      onMouseEnter={() => speak(`${title}: ${value}`)}
      onMouseLeave={stop}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '300px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ padding: '10px', background: 'var(--accent-gold-soft)', borderRadius: '12px' }}>
          <Icon size={24} className="gold-accent" />
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{title}</span>
          <h3 className="serif" style={{ fontSize: '1.5rem' }}>{value}</h3>
        </div>
      </div>
      
      <div style={{ flex: 1, marginTop: '1rem', width: '100%', height: '150px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent-gold)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--accent-gold)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="value" stroke="var(--accent-gold)" fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

const Analytics = () => {
  const { speak, stop } = useAura();
  const { t } = useTranslation();
  
  return (
    <section style={{ padding: '0 5% 100px' }}>
      <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h2 
          style={{ fontSize: '2.4rem', marginBottom: '1rem' }}
          onMouseEnter={(e) => speak(e.target.innerText)}
          onMouseLeave={stop}
        >
          {t('analytics.title')}
        </h2>
        <div 
          style={{ width: '60px', height: '2px', background: 'var(--accent-gold)', margin: '0 auto' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <AnalyticsCard title={t('analytics.globalReach')} value="1.2M+" icon={TrendingUp} />
        <AnalyticsCard title={t('analytics.brandValue')} value="$850K" icon={Award} />
        <AnalyticsCard title={t('analytics.engagement')} value="94.2%" icon={Zap} />
      </div>
    </section>
  );
};

export default Analytics;
