## Environment Variables

See `.env.json.example`.  Rename or move to `.env.json`

Acceptable values for `PLATFORM` are: "web, ios, android".
Acceptable values for `ENVIRONMENT` are: "dev, production".

**If you add an environment variable,** you will need to add it to the `.env.json`, the `AppConfig` in `app.module.js`, **and**
the `make-env-json-file.py`.

The `make-env-json-file.py` is to grab the environment variables from the build server.

These variables are injected by the build system into Angular.  Two of them, `ENV` and `PLATFORM`, are injected directly onto the root object (`window`).
