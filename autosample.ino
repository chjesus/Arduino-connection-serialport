
int count = 5;
String SerialAnalog;

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  SerialAnalog = "";

  for (int i = 0; i < count; i++)
  {
    SerialAnalog += String(analogRead(i)) + ',';
  }

  SerialAnalog.remove(SerialAnalog.length() - 1, 1);

  Serial.println(SerialAnalog);
  delay(1500);
}
