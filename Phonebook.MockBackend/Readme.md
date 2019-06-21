# Mock Backend

This Folder does contain utility programs and dockerfile to mock the backend.

## Quickstart

Run `docker run -rm -p 8080:80 tsystemsmms/phonebook-build:mock-backend` in order to run the mock backend with the current data. Visit [http://localhost:8080/persons](http://localhost:8080/persons)

## Development

1. Modify the files in the `/mocks` folder as you wish.

   - You can modify the handcrafted data in the `real` folder.
   - Or use the mock generator by running `npm run generate`, this will update the files in `synthetic`.

2. Build the docker image:
   - With real data: `docker build -t tsystemsmms/phonebook-build:mock-backend -f real.Dockerfile .`
   - With synthetic data: `docker build -t tsystemsmms/phonebook-build:mock-backend -f synthetic.Dockerfile .`
3. Run it with the Quickstart command.
