/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import * as path from "path";
import fs from 'fs'

const sqlBasePath = path.join(__dirname, '../../sql');

// Resolve the version-specific SQL directory.
// If the exact version directory does not exist (e.g. PostgreSQL 16, 17),
// fall back to the nearest lower version that provides the SQL,
// or the highest available version if none is lower.
function resolveVersionDir(name, version) {
    if (!version) return '';
    if (fs.existsSync(path.join(sqlBasePath, version, `${name}.sql`))) {
        return version;
    }
    const requested = parseInt(version, 10);
    const available = fs.readdirSync(sqlBasePath, {withFileTypes: true})
        .filter((d) => d.isDirectory() && /^\d+$/.test(d.name))
        .map((d) => parseInt(d.name, 10))
        .filter((v) => fs.existsSync(path.join(sqlBasePath, String(v), `${name}.sql`)))
        .sort((a, b) => a - b);
    if (available.length === 0) return version;
    const lower = available.filter((v) => v <= requested);
    const chosen = lower.length > 0 ? lower[lower.length - 1] : available[available.length - 1];
    return String(chosen);
}

// todo: util.format -> ejs
function getQuery(name, version='') {
    const sqlPath = path.join(sqlBasePath, resolveVersionDir(name, version), `${name}.sql`);
    if (!fs.existsSync(sqlPath)) {
        throw new Error(`SQL does not exist, name = ${name}`);
    }
    return fs.readFileSync(sqlPath, 'utf8');
}

export {getQuery}
