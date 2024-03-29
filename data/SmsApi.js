import Rx from 'rxjs';

const protocol = 'ws://';
const host = 'kindstrom.io:9137';
const path = '/sms';

export function sendSms(to, msg) {
  console.log('opening to ' + protocol + host + path);

  const ws = new WebSocket(protocol + host + path);

  return Rx.Observable.create(observer => {
    ws.onopen = () => {
      ws.send(JSON.stringify({ to, msg }));
    };

    ws.onmessage = (response) => {
      const parsedResponse = JSON.parse(response.data);
      observer.next(parsedResponse);
    };

    ws.onclose = () => {
      observer.complete();
    }

    ws.onerror = (e) => {
      observer.error(e);
    }

    return () => {
      console.log('Closing connection to server because of unsubscribe');
      ws.close()
    }
  });
}