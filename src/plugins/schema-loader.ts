import { FastifyInstance } from "fastify";
import FastifyPlugin from 'fastify-plugin';
import { readdirSync,statSync } from 'fs';
import { join } from 'path';

const namespace = '[SchemaLoaderPlugin]';

interface SchemaLoaderPluginOptions {
  schemasDir: string,
}

const walkDir = (dir: string, fileList: string[] = []): string[] => {
	const topLevelDir: string[] = readdirSync(dir);

	topLevelDir.forEach((file) => {
		const joinedPath = join(dir, file);
		const stat = statSync(joinedPath);

		if (stat.isDirectory()) fileList = walkDir(joinedPath, fileList);
		else if (joinedPath.endsWith('.js')) fileList.push(joinedPath);
	});

	return fileList;
}

const loadSchema = (fastify: FastifyInstance, dir: string): void => {
  let fileLists;

  try {
    fileLists = walkDir(dir);
  } catch(err) {
    fastify.log.error(`${namespace} ${err.message}`);

    return;
  }

  if (fileLists.length === 0) {
    fastify.log.warn(`${namespace} ${dir} has no schema to be loaded`);
  }
  
  fileLists.forEach(file => {
    // replace JSON with the right type for JSON schema
    /* eslint-disable @typescript-eslint/no-var-requires */
    const schemas: JSON[] = require(file).default;
    schemas.forEach(schema => fastify.addSchema(schema));
  }, {});
};

const plugin = async (fastify: FastifyInstance, opt: SchemaLoaderPluginOptions): Promise<void> => {
  const { schemasDir } = opt;

  if (typeof schemasDir !== 'string') {
    throw new Error(`${namespace} expected path to be a string; got ${schemasDir} instead`);
  }

  loadSchema(fastify, schemasDir);

  fastify.log.info(`${namespace} Loaded schemas`);
};

export default FastifyPlugin<SchemaLoaderPluginOptions>(plugin);
