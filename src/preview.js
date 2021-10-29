import groq from 'groq'
import * as uuid from 'uuid'

export const server = {
  async isValidPreviewSecret(previewSecret, { authorizedClient }) {
    const result = await authorizedClient.fetch(
      groq`*[_type == "previewSecret" && _id == $id][0]`,
      { id: `secrets.${previewSecret}` }
    )
    return Boolean(result)
  },

  async removePreviewSecret(previewSecret, { authorizedClient }) {
    await authorizedClient.delete(`secrets.${previewSecret}`)
  },
}

export const studio = {
  async getPreviewSecret({ sanityClient }) {
    const secret = uuid.v4()
    await sanityClient.createOrReplace({ _id: `secrets.${secret}`, _type: 'previewSecret' })
    return secret
  }
}
