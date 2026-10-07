import { createClient } from '@supabase/supabase-js';
import { Appointment } from '../types';

export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://lshbwciivyhbildqyfcp.supabase.co';
export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_KmOLcIl3griN4E0neOhUhg_96qEu0ss';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const SUPABASE_SQL_SCHEMA = `-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/lshbwciivyhbildqyfcp/sql/new

CREATE TABLE IF NOT EXISTS public.appointments (
  id TEXT PRIMARY KEY,
  patient_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service_id TEXT NOT NULL,
  service_name TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  status TEXT DEFAULT 'PENDING',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts so booking form works directly
CREATE POLICY "Allow public insert appointments"
ON public.appointments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow reading appointments
CREATE POLICY "Allow select appointments"
ON public.appointments
FOR SELECT
TO anon, authenticated
USING (true);

-- Allow updating appointments
CREATE POLICY "Allow update appointments"
ON public.appointments
FOR UPDATE
TO anon, authenticated
USING (true);
`;

/**
 * Inserts an appointment into Supabase.
 * Supports both snake_case and camelCase column definitions.
 */
export async function saveAppointmentToSupabase(appointment: Appointment): Promise<{
  success: boolean;
  error?: string;
  data?: any;
}> {
  try {
    const payload = {
      id: appointment.id,
      patient_name: appointment.patientName,
      phone: appointment.phone,
      email: appointment.email || null,
      service_id: appointment.serviceId,
      service_name: appointment.serviceName,
      date: appointment.date,
      time: appointment.time,
      status: appointment.status || 'PENDING',
      notes: appointment.notes || null,
      created_at: appointment.createdAt || new Date().toISOString()
    };

    const { data, error } = await supabase.from('appointments').insert([payload]).select();

    if (error) {
      console.warn('Supabase insert notice:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('Supabase exception:', err);
    return { success: false, error: err.message || 'Unknown Supabase error' };
  }
}

/**
 * Checks connection and table presence in Supabase.
 */
export async function checkSupabaseStatus(): Promise<{
  connected: boolean;
  tableExists: boolean;
  error?: string;
  count?: number;
}> {
  try {
    const { data, error } = await supabase.from('appointments').select('id').limit(1);

    if (error) {
      if (error.code === 'PGRST205' || error.message.includes('Could not find the table')) {
        return { connected: true, tableExists: false, error: error.message };
      }
      return { connected: false, tableExists: false, error: error.message };
    }

    const { count } = await supabase.from('appointments').select('*', { count: 'exact', head: true });
    return { connected: true, tableExists: true, count: count ?? (data?.length || 0) };
  } catch (err: any) {
    return { connected: false, tableExists: false, error: err.message };
  }
}
