import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(path.join(dataDir, "customers.db"));
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone_number TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdAt: string;
}

function mapRow(row: any): Customer {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    phoneNumber: row.phone_number,
    createdAt: row.created_at,
  };
}

export function insertCustomer(data: {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}): Customer {
  const info = db
    .prepare(
      `INSERT INTO customers (first_name, last_name, phone_number) VALUES (?, ?, ?)`
    )
    .run(data.firstName, data.lastName, data.phoneNumber);
  return getCustomerById(info.lastInsertRowid as number)!;
}

export function getCustomerByPhone(phoneNumber: string): Customer | undefined {
  const row = db
    .prepare(`SELECT * FROM customers WHERE phone_number = ?`)
    .get(phoneNumber) as any;
  return row ? mapRow(row) : undefined;
}

export function getCustomerById(id: number): Customer | undefined {
  const row = db.prepare(`SELECT * FROM customers WHERE id = ?`).get(id) as any;
  return row ? mapRow(row) : undefined;
}

export function getAllCustomers(): Customer[] {
  return (db.prepare(`SELECT * FROM customers ORDER BY created_at DESC`).all() as any[]).map(
    mapRow
  );
}