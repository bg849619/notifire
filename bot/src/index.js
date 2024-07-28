/**
 * Entrypoint to the program
 */

import dotenv from 'dotenv';
dotenv.config();

// Import commands.
import './commands/index.js';

// Import database and start.
import { start as dbStart } from './database/index.js';
dbStart();

// Import voiceStateUpdate handler and start
import './voiceStateUpdate.js';

// Import discord client and start.
import { start as discordStart } from './utilities/client.js';
discordStart();
