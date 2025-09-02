import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stats } from '@/lib/api';

interface StatsCardsProps {
  stats: Stats;
  doctorsCount: number;
}

export function StatsCards({ stats, doctorsCount }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total_patients}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{doctorsCount}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.status_stats?.active || 0}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Departments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Object.keys(stats.category_stats || {}).length}</div>
        </CardContent>
      </Card>
    </div>
  );
}