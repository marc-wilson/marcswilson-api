import * as Showdown from 'showdown';
interface INpmPackage {
    _id: string;
    _rev: string;
    name: string;
    'dist-tags': { latest: string };
    versions: any;
    time: any;
    maintainers: { name: string, email: string }[];
    license: string;
    readme: string;
    readmeFilename: string;
    description: string;
    homepage: string;
    repository: { type: string, url: string };
    author: { name: string; };
    bugs: { url: string };
    keywords: string[];
    _attachments: any;
    readmeHTML: string;
}

export class NpmPackage implements INpmPackage {
    public _id: string;
    public _rev: string;
    public name: string;
    public 'dist-tags': { latest: string };
    public versions: any;
    public time: any;
    public maintainers: { name: string, email: string }[];
    public license: string;
    public readme: string;
    public readmeFilename: string;
    public description: string;
    public homepage: string;
    public repository: { type: string, url: string };
    public author: { name: string; };
    public bugs: { url: string };
    public keywords: string[];
    public _attachments: any;
    public readmeHTML: string;
    private readonly converter: any;
    constructor(pkg?) {
        if (pkg) {
            this._id = pkg._id;
            this._rev = pkg._rev;
            this.name = pkg.name;
            this['dist-tags'] = pkg['dist-tags'];
            this.versions = pkg.versions;
            this.time = pkg.time;
            this.maintainers = pkg.maintainers;
            this.license = pkg.license;
            this.readme = pkg.readme;
            this.readmeFilename = pkg.readmeFilename;
            this.description = pkg.description;
            this.homepage = pkg.homepage;
            this.repository = pkg.repository;
            this.author = pkg.author;
            this.bugs = pkg.bugs;
            this.keywords = pkg.keywords;
            this._attachments = pkg._attachments;
            this.converter = new Showdown.Converter();
            if (this.readme && this.readme !== '') {
                this.readmeHTML = this.converter.makeHtml(this.readme);
            }
        }
    }
}