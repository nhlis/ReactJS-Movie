import { Project } from 'ts-morph';
import path from 'path';

const project = new Project({
    tsConfigFilePath: 'tsconfig.app.json',
});

const files = project.getSourceFiles('src/**/*.{ts,tsx}');

files.forEach((file) => {
    const imports = file.getImportDeclarations();
    
    imports.forEach((imp) => {
        const spec = imp.getModuleSpecifierValue();
        console.log(spec);

        if (spec.startsWith('../') || spec.startsWith('./')) {
            const absolute = path.resolve(path.dirname(file.getFilePath()), spec);
            const srcRoot = path.resolve('src');

            if (absolute.startsWith(srcRoot)) {
                const newPath = '@/' + path.relative(srcRoot, absolute).replace(/\\/g, '/');
                imp.setModuleSpecifier(newPath);
            }
        }
    });
});

project.saveSync();
