import http from 'http'
import https from 'https'

export class HttpRequest {
  static get(url: string, options: http.RequestOptions = {}): Promise<string> {
    const lib = url.startsWith('https://') ? https : http

    return new Promise((resolve, reject) => {
      const req = lib.request(url, options, (res) => {
        res.setEncoding('utf8')
        if (
          res.statusCode == null ||
          res.statusCode < 200 ||
          res.statusCode >= 300
        ) {
          return reject(new Error(`Status Code: ${res.statusCode}`))
        }

        const data: string[] = []

        res.on('data', (chunk) => {
          data.push(chunk)
        })

        res.on('end', () => {
          resolve(data.join(''))
        })
      })

      req.on('error', reject)

      // IMPORTANT
      req.end()
    })
  }
}
