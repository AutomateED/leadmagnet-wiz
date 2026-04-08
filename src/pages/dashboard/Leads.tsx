import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Lead {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  result_type: string | null;
  quiz_slug: string;
  created_at: string | null;
}

export default function Leads() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterSlug, setFilterSlug] = useState<string>('all');

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to load leads:', error);
        setLeads([]);
      } else {
        setLeads((data as Lead[]) || []);
      }
      setLoading(false);
    })();
  }, [user]);

  const slugs = useMemo(() => {
    const set = new Set(leads.map((l) => l.quiz_slug).filter(Boolean));
    return Array.from(set).sort();
  }, [leads]);

  const filtered = useMemo(
    () => (filterSlug === 'all' ? leads : leads.filter((l) => l.quiz_slug === filterSlug)),
    [leads, filterSlug],
  );

  const formatDate = (iso: string | null) => {
    if (!iso) return '—';
    const d = new Date(iso);
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-16">
        <div
          className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent"
          style={{ borderColor: '#D946EF', borderTopColor: 'transparent' }}
        />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold" style={{ color: '#0F0A1E' }}>Your Leads</h1>
          <span
            className="rounded-full px-3 py-0.5 text-xs font-semibold"
            style={{ backgroundColor: 'rgba(217,70,239,0.12)', color: '#D946EF' }}
          >
            {filtered.length} lead{filtered.length !== 1 ? 's' : ''}
          </span>
          {filtered.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const headers = ['Name', 'Email', 'Result Type', 'Quiz', 'Date'];
                const rows = filtered.map(lead => [
                  [lead.first_name, lead.last_name].filter(Boolean).join(' ') || '',
                  lead.email,
                  lead.result_type,
                  lead.quiz_slug,
                  lead.created_at ? new Date(lead.created_at).toLocaleDateString('en-GB') : ''
                ]);
                const csvContent = [headers, ...rows]
                  .map(row => row.map(cell => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(','))
                  .join('\n');
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `pretaquiz-leads-${new Date().toISOString().split('T')[0]}.csv`;
                link.click();
                URL.revokeObjectURL(url);
              }}
              style={{ borderColor: 'rgba(217,70,239,0.25)', color: '#D946EF' }}
            >
              <Download className="h-4 w-4" />
              Download CSV
            </Button>
          )}
        </div>

        {slugs.length > 1 && (
          <Select value={filterSlug} onValueChange={setFilterSlug}>
            <SelectTrigger className="w-[220px]" style={{ borderColor: 'rgba(217,70,239,0.25)' }}>
              <SelectValue placeholder="All quizzes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All quizzes</SelectItem>
              {slugs.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {filtered.length === 0 ? (
        <div
          className="rounded-xl p-12 text-center"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(217,70,239,0.15)' }}
        >
          <p style={{ color: '#6B5F80' }}>
            {leads.length === 0
              ? 'No leads yet. Share your quiz link to get started.'
              : 'No leads match this filter.'}
          </p>
        </div>
      ) : (
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid rgba(217,70,239,0.15)' }}
        >
          <table className="w-full text-sm" style={{ backgroundColor: '#FFFFFF' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(217,70,239,0.15)' }}>
                <th className="text-left px-5 py-3 font-semibold" style={{ color: '#0F0A1E' }}>Name</th>
                <th className="text-left px-5 py-3 font-semibold" style={{ color: '#0F0A1E' }}>Email</th>
                <th className="text-left px-5 py-3 font-semibold" style={{ color: '#0F0A1E' }}>Result Type</th>
                <th className="text-left px-5 py-3 font-semibold" style={{ color: '#0F0A1E' }}>Quiz</th>
                <th className="text-left px-5 py-3 font-semibold" style={{ color: '#0F0A1E' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr
                  key={lead.id}
                  className="transition-colors hover:bg-[rgba(217,70,239,0.04)]"
                  style={{ borderBottom: '1px solid rgba(217,70,239,0.08)' }}
                >
                  <td className="px-5 py-3" style={{ color: '#0F0A1E' }}>
                    {[lead.first_name, lead.last_name].filter(Boolean).join(' ') || '—'}
                  </td>
                  <td className="px-5 py-3" style={{ color: '#6B5F80' }}>{lead.email}</td>
                  <td className="px-5 py-3">
                    {lead.result_type ? (
                      <span
                        className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                        style={{ backgroundColor: 'rgba(217,70,239,0.10)', color: '#D946EF' }}
                      >
                        {lead.result_type}
                      </span>
                    ) : (
                      <span style={{ color: '#9A8EAA' }}>—</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs font-mono" style={{ color: '#6B5F80' }}>{lead.quiz_slug}</span>
                  </td>
                  <td className="px-5 py-3" style={{ color: '#6B5F80' }}>{formatDate(lead.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
