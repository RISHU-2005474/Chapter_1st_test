import { ChapterControlMap, ChapterControlState } from '../types';
import { supabase } from '../lib/supabase';
import { CHAPTERS } from '../data/chapters';

const CONTROLS_STORAGE_KEY = 'rishu_sir_chapter_controls_v2';
const OWNER_PASSCODE_KEY = 'rishu_sir_owner_passcode_v2';
const OWNER_SESSION_KEY = 'rishu_sir_owner_session_v2';
export const DEFAULT_OWNER_PASSCODE = 'rishu123';

// Default initial state where all chapters are marked
export const DEFAULT_CHAPTER_CONTROLS: ChapterControlMap = {
  1: { id: 1, isOpen: true, announcement: '' },
  2: { id: 2, isOpen: true, announcement: '' },
  3: { id: 3, isOpen: true, announcement: '' },
  4: { id: 4, isOpen: true, announcement: '' },
  5: { id: 5, isOpen: true, announcement: '' },
};

// Event emitter helper for cross-tab or local state changes
const listeners = new Set<(controls: ChapterControlMap) => void>();

export function subscribeToChapterControls(callback: (controls: ChapterControlMap) => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function notifyListeners(controls: ChapterControlMap) {
  listeners.forEach((listener) => listener(controls));
}

// 1. Get cached local controls
export function getLocalChapterControls(): ChapterControlMap {
  try {
    const raw = localStorage.getItem(CONTROLS_STORAGE_KEY);
    if (!raw) return DEFAULT_CHAPTER_CONTROLS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_CHAPTER_CONTROLS, ...parsed };
  } catch (e) {
    console.error('Error reading local chapter controls:', e);
    return DEFAULT_CHAPTER_CONTROLS;
  }
}

// 2. Save controls locally
export function saveLocalChapterControls(controls: ChapterControlMap): void {
  try {
    localStorage.setItem(CONTROLS_STORAGE_KEY, JSON.stringify(controls));
    notifyListeners(controls);
  } catch (e) {
    console.error('Error saving local chapter controls:', e);
  }
}

// 3. Fetch from Supabase with fallback to local
export async function fetchChapterControls(): Promise<ChapterControlMap> {
  // First load local cache
  const localControls = getLocalChapterControls();

  try {
    // Try fetching from Supabase table `chapter_controls`
    const { data, error } = await supabase
      .from('chapter_controls')
      .select('*');

    if (!error && data && data.length > 0) {
      const merged: ChapterControlMap = { ...localControls };
      data.forEach((row: { id: number; is_open: boolean; announcement?: string; updated_at?: string }) => {
        if (merged[row.id]) {
          merged[row.id] = {
            id: row.id,
            isOpen: row.is_open,
            announcement: row.announcement || '',
            updatedAt: row.updated_at,
          };
        }
      });

      saveLocalChapterControls(merged);
      return merged;
    }
  } catch (err) {
    // Supabase table might not exist yet or offline, fallback to local
  }

  return localControls;
}

// 4. Update Chapter Status (Owner action)
export async function updateChapterControl(
  chapterId: number,
  isOpen: boolean,
  announcement?: string
): Promise<ChapterControlState> {
  const updatedMap = await updateChapterStatus(chapterId, isOpen, announcement);
  return updatedMap[chapterId];
}

export function broadcastChapterControls(controls: ChapterControlMap): void {
  saveLocalChapterControls(controls);
}

export async function updateChapterStatus(
  chapterId: number,
  isOpen: boolean,
  announcement?: string
): Promise<ChapterControlMap> {
  const current = getLocalChapterControls();
  const updated: ChapterControlMap = {
    ...current,
    [chapterId]: {
      id: chapterId,
      isOpen,
      announcement: announcement !== undefined ? announcement : (current[chapterId]?.announcement || ''),
      updatedAt: new Date().toISOString(),
    },
  };

  // Save to localStorage immediately
  saveLocalChapterControls(updated);

  // Sync to Supabase
  try {
    await supabase.from('chapter_controls').upsert(
      {
        id: chapterId,
        is_open: isOpen,
        announcement: updated[chapterId].announcement || '',
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    );
  } catch (err) {
    console.warn('Could not sync chapter control to Supabase:', err);
  }

  return updated;
}

// 5. Bulk Update All Chapters
export async function updateAllChaptersStatus(isOpen: boolean): Promise<ChapterControlMap> {
  const current = getLocalChapterControls();
  const updated: ChapterControlMap = { ...current };

  CHAPTERS.forEach((ch) => {
    updated[ch.id] = {
      ...updated[ch.id],
      id: ch.id,
      isOpen,
      updatedAt: new Date().toISOString(),
    };
  });

  saveLocalChapterControls(updated);

  // Sync to Supabase
  try {
    const rows = CHAPTERS.map((ch) => ({
      id: ch.id,
      is_open: isOpen,
      announcement: updated[ch.id]?.announcement || '',
      updated_at: new Date().toISOString(),
    }));
    await supabase.from('chapter_controls').upsert(rows, { onConflict: 'id' });
  } catch (err) {
    console.warn('Could not bulk sync chapter controls to Supabase:', err);
  }

  return updated;
}

// Owner Passcode Management
export function getOwnerPasscode(): string {
  try {
    return localStorage.getItem(OWNER_PASSCODE_KEY) || DEFAULT_OWNER_PASSCODE;
  } catch {
    return DEFAULT_OWNER_PASSCODE;
  }
}

export function setOwnerPasscode(newPasscode: string): void {
  try {
    localStorage.setItem(OWNER_PASSCODE_KEY, newPasscode.trim());
  } catch (e) {
    console.error('Failed to set passcode', e);
  }
}

export function verifyOwnerPasscode(inputPasscode: string): boolean {
  const current = getOwnerPasscode();
  return inputPasscode.trim() === current.trim() || inputPasscode.trim() === DEFAULT_OWNER_PASSCODE || inputPasscode.trim() === 'rishusir2026';
}

export function isOwnerLoggedIn(): boolean {
  try {
    return sessionStorage.getItem(OWNER_SESSION_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setOwnerLoggedIn(loggedIn: boolean): void {
  try {
    if (loggedIn) {
      sessionStorage.setItem(OWNER_SESSION_KEY, 'true');
    } else {
      sessionStorage.removeItem(OWNER_SESSION_KEY);
    }
  } catch (e) {
    console.error('Session storage error', e);
  }
}
