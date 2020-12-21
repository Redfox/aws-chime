import crypto from 'crypto';
import querystring from 'query-string';

export function createCanonicalRequest(method: any, pathname: any, query: any, headers: any, payload: any) {
  return [
    method.toUpperCase(),
    pathname,
    createCanonicalQueryString(query),
    createCanonicalHeaders(headers),
    createSignedHeaders(headers),
    payload
  ].join('\n');
};

export function createCanonicalQueryString(params: any) {
  return Object.keys(params).sort().map(function(key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  }).join('&');
};

export function createCanonicalHeaders(headers: any) {
  return Object.keys(headers).sort().map(function(name) {
    return name.toLowerCase().trim() + ':' + headers[name].toString().trim() + '\n';
  }).join('');
};

export function createSignedHeaders(headers: any) {
  return Object.keys(headers).sort().map(function(name) {
    return name.toLowerCase().trim();
  }).join(';');
};

export function createCredentialScope(time: any, region: any, service: any) {
  return [toDate(time), region, service, 'aws4_request'].join('/');
};

export function createStringToSign(time: any, region: any, service: any, request: any) {
  return [
    'AWS4-HMAC-SHA256',
    toTime(time),
    createCredentialScope(time, region, service),
    hash(request, 'hex')
  ].join('\n');
};

export function createSignature(secret: any, time: any, region: any, service: any, stringToSign: any) {
  var h1 = hmac('AWS4' + secret, toDate(time), null); // date-key
  var h2 = hmac(h1, region, null); // region-key
  var h3 = hmac(h2, service, null); // service-key
  var h4 = hmac(h3, 'aws4_request', null); // signing-key
  return hmac(h4, stringToSign, 'hex');
};

export function createPresignedS3URL(name: any, options: any) {
  options = options || {};
  options.method = options.method || 'GET';
  options.bucket = options.bucket || process.env.AWS_S3_BUCKET;
  return createPresignedURL(
    options.method,
    options.bucket + '.s3.amazonaws.com',
    '/' + name,
    's3',
    'UNSIGNED-PAYLOAD',
    options
  );
};

export function createPresignedURL(method: any, host: any, path: any, service: any, payload: any, options: any) {
  options = options || {};
  options.key = options.key || process.env.AWS_ACCESS_KEY_ID;
  options.secret = options.secret || process.env.AWS_SECRET_ACCESS_KEY;
  options.protocol = options.protocol || 'https';
  options.headers = options.headers || {};
  options.timestamp = options.timestamp || Date.now();
  options.region = options.region || process.env.AWS_REGION || 'us-east-1';
  options.expires = options.expires || 86400; // 24 hours
  options.headers = options.headers || {};

  // host is required
  options.headers.Host = host;

  var query = options.query ? querystring.parse(options.query) : {};
  query['X-Amz-Algorithm'] = 'AWS4-HMAC-SHA256';
  query['X-Amz-Credential'] = options.key + '/' + createCredentialScope(options.timestamp, options.region, service);
  query['X-Amz-Date'] = toTime(options.timestamp);
  query['X-Amz-Expires'] = options.expires;
  query['X-Amz-SignedHeaders'] = createSignedHeaders(options.headers);

  var canonicalRequest = createCanonicalRequest(method, path, query, options.headers, payload);
  var stringToSign = createStringToSign(options.timestamp, options.region, service, canonicalRequest);
  var signature = createSignature(options.secret, options.timestamp, options.region, service, stringToSign);
  query['X-Amz-Signature'] = signature;
  return options.protocol + '://' + host + path + '?' + querystring.stringify(query);
};

function toTime(time: any) {
  return new Date(time).toISOString().replace(/[:\-]|\.\d{3}/g, '');
}

function toDate(time: any) {
  return toTime(time).substring(0, 8);
}

function hmac(key: any, string: any, encoding: any) {
  return crypto.createHmac('sha256', key)
    .update(string, 'utf8')
    .digest(encoding);
}

function hash(string: any, encoding: any) {
  return crypto.createHash('sha256')
    .update(string, 'utf8')
    .digest(encoding);
}