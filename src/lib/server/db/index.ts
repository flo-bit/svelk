import { dev } from '$app/environment';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';
import * as schema from "$lib/schema";

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
if (!dev && !env.DATABASE_AUTH_TOKEN) throw new Error('DATABASE_AUTH_TOKEN is not set');
const client = createClient({ url: env.DATABASE_URL, authToken: env.DATABASE_AUTH_TOKEN });

// create database schema if it doesnt exist
client.execute(`CREATE TABLE IF NOT EXISTS auth_session (
    key TEXT PRIMARY KEY UNIQUE,
    session TEXT NOT NULL
    );`);

client.execute(`CREATE TABLE IF NOT EXISTS auth_state (
    key TEXT PRIMARY KEY UNIQUE,
    state TEXT NOT NULL
    );`);

client.execute(`CREATE TABLE IF NOT EXISTS draft_post (
    id TEXT PRIMARY KEY UNIQUE,
    content TEXT NOT NULL,
    author_did TEXT NOT NULL
    );`);

client.execute(`CREATE TABLE IF NOT EXISTS bookmark (
    id TEXT PRIMARY KEY UNIQUE,
    uri TEXT,
    author_did TEXT NOT NULL
    );`);
export const db = drizzle(client, { schema });
