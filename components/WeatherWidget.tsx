import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, CloudRain, Cloud, Wind, Droplets, MapPin, RefreshCw, Thermometer } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
  };
}

// WMO Weather interpretation codes
const getWeatherDescription = (code: number, t: (key: string) => string) => {
  if (code === 0) return { text: t('Clear sky'), icon: <Sun className="text-yellow-500" size={48} /> };
  if (code === 1 || code === 2 || code === 3) return { text: t('Partly cloudy'), icon: <Cloud className="text-gray-400" size={48} /> };
  if (code >= 45 && code <= 48) return { text: t('Fog'), icon: <Cloud className="text-gray-300" size={48} /> };
  if (code >= 51 && code <= 67) return { text: t('Rain'), icon: <CloudRain className="text-blue-400" size={48} /> };
  if (code >= 71 && code <= 77) return { text: t('Snow'), icon: <Cloud className="text-blue-200" size={48} /> };
  if (code >= 80 && code <= 82) return { text: t('Rain showers'), icon: <CloudRain className="text-blue-500" size={48} /> };
  if (code >= 95 && code <= 99) return { text: t('Thunderstorm'), icon: <CloudRain className="text-purple-500" size={48} /> };
  return { text: t('Unknown'), icon: <Cloud className="text-gray-400" size={48} /> };
};

export const WeatherWidget: React.FC = () => {
  const { t } = useLanguage();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    setError(false);
    try {
      // Coordinates for Teluk Intan, Perak
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=4.0259&longitude=101.0213&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=Asia%2FSingapore');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setWeather(data);
    } catch (e) {
      console.error(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-red-100 dark:border-red-900/30 text-center">
        <p className="text-red-500 mb-2">{t('Failed to load weather data.')}</p>
        <button onClick={fetchWeather} className="text-farm-600 hover:underline">{t('Try Again')}</button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-md border border-blue-100 dark:border-gray-700 relative overflow-hidden"
    >
      {/* Decorative background circle */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-2 text-farm-900 dark:text-white">
          <MapPin size={20} className="text-farm-500" />
          <h3 className="text-xl font-bold">{t('Teluk Intan, Perak')}</h3>
        </div>
        <button 
          onClick={fetchWeather} 
          disabled={loading}
          className="p-2 text-gray-500 hover:text-farm-600 hover:bg-white dark:hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50"
          title={t('Refresh Weather')}
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading && !weather ? (
        <div className="flex justify-center items-center h-40">
          <RefreshCw size={32} className="animate-spin text-farm-500" />
        </div>
      ) : weather ? (
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm">
                {getWeatherDescription(weather.current.weather_code, t).icon}
              </div>
              <div>
                <div className="text-5xl font-bold text-gray-900 dark:text-white tracking-tighter">
                  {Math.round(weather.current.temperature_2m)}°<span className="text-3xl text-gray-400 font-normal">C</span>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                  {getWeatherDescription(weather.current.weather_code, t).text}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-4 rounded-2xl flex flex-col items-center justify-center text-center">
              <Thermometer size={24} className="text-orange-500 mb-2" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('Feels Like')}</p>
              <p className="font-bold text-gray-900 dark:text-white">{Math.round(weather.current.apparent_temperature)}°C</p>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-4 rounded-2xl flex flex-col items-center justify-center text-center">
              <Droplets size={24} className="text-blue-500 mb-2" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('Humidity')}</p>
              <p className="font-bold text-gray-900 dark:text-white">{weather.current.relative_humidity_2m}%</p>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-4 rounded-2xl flex flex-col items-center justify-center text-center">
              <Wind size={24} className="text-teal-500 mb-2" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('Wind')}</p>
              <p className="font-bold text-gray-900 dark:text-white">{weather.current.wind_speed_10m} <span className="text-xs font-normal">km/h</span></p>
            </div>
          </div>
        </div>
      ) : null}
    </motion.div>
  );
};
