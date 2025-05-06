interface SchemaInjectionOptions {
  schema: Record<string, any>;
  targetElement?: string;
}

export class SchemaInjector {
  private static instance: SchemaInjector;
  private scriptId = 'schema-json-ld';

  private constructor() {}

  static getInstance(): SchemaInjector {
    if (!SchemaInjector.instance) {
      SchemaInjector.instance = new SchemaInjector();
    }
    return SchemaInjector.instance;
  }

  injectSchema({ schema, targetElement = 'head' }: SchemaInjectionOptions): void {
    // Remove existing schema if present
    this.removeExistingSchema();

    // Create new script element
    const script = document.createElement('script');
    script.id = this.scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);

    // Insert into target element
    const target = document.querySelector(targetElement);
    if (target) {
      target.appendChild(script);
    } else {
      console.warn(`Target element '${targetElement}' not found for schema injection`);
    }
  }

  private removeExistingSchema(): void {
    const existingScript = document.getElementById(this.scriptId);
    if (existingScript) {
      existingScript.remove();
    }
  }

  // Helper method to validate schema structure
  static validateSchema(schema: Record<string, any>): boolean {
    try {
      // Basic validation - ensure required fields are present
      if (!schema['@context'] || !schema['@type']) {
        console.error('Schema missing required @context or @type');
        return false;
      }

      // Additional validation based on schema type
      switch (schema['@type']) {
        case 'VideoObject':
          return this.validateVideoSchema(schema);
        case 'BlogPosting':
          return this.validateBlogSchema(schema);
        case 'BreadcrumbList':
          return this.validateBreadcrumbSchema(schema);
        case 'FAQPage':
          return this.validateFAQSchema(schema);
        default:
          return true; // Accept other schema types without validation
      }
    } catch (error) {
      console.error('Error validating schema:', error);
      return false;
    }
  }

  private static validateVideoSchema(schema: Record<string, any>): boolean {
    return Boolean(
      schema.name &&
      schema.description &&
      schema.thumbnailUrl &&
      schema.uploadDate &&
      schema.contentUrl
    );
  }

  private static validateBlogSchema(schema: Record<string, any>): boolean {
    return Boolean(
      schema.headline &&
      schema.description &&
      schema.datePublished &&
      schema.author?.name
    );
  }

  private static validateBreadcrumbSchema(schema: Record<string, any>): boolean {
    return Boolean(
      Array.isArray(schema.itemListElement) &&
      schema.itemListElement.length > 0
    );
  }

  private static validateFAQSchema(schema: Record<string, any>): boolean {
    return Boolean(
      Array.isArray(schema.mainEntity) &&
      schema.mainEntity.length > 0
    );
  }
} 