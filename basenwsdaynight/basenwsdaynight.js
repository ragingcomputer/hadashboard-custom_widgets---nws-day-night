function basenwsdaynight(widget_id, url, skin, parameters) {
  // Will be using "self" throughout for the various flavors of "this"
  // so for consistency ...

  self = this;

  self.weather_mdi = {
    "clear-night": "mdi-weather-night",
    "cloudy": "mdi-weather-cloudy",
    "exceptional": "mdi-alert-circle-outline",
    "fog": "mdi-weather-fog",
    "hail": "mdi-weather-hail",
    "lightning": "mdi-weather-lightning",
    "lightning-rainy": "mdi-weather-lightning-rainy",
    "partlycloudy": "mdi-weather-partly-cloudy",
    "pouring": "mdi-weather-pouring",
    "rainy": "mdi-weather-rainy",
    "snowy": "mdi-weather-snowy",
    "snowy-rainy": "mdi-weather-snowy-rainy",
    "sunny": "mdi-weather-sunny",
    "windy": "mdi-weather-windy",
    "windy-variant": "mdi-weather-windy-variant"
  }

  // Initialization

  self.widget_id = widget_id;

  // Store on brightness or fallback to a default

  // Parameters may come in useful later on

  self.parameters = parameters;

  var callbacks = [];

  // Define callbacks for entities - this model allows a widget to monitor multiple entities if needed
  // Initial will be called when the dashboard loads and state has been gathered for the entity
  // Update will be called every time an update occurs for that entity

  self.OnUpdate = OnUpdate;

  title = parameters.title;
  weather_entity = parameters.weather_entity;

  var monitored_entities = [{
    "entity": weather_entity,
    "initial": self.OnUpdate,
    "update": self.OnUpdate
  }];
  // Finally, call the parent constructor to get things moving

  WidgetBase.call(self, widget_id, url, skin, parameters, monitored_entities,
    callbacks);

  // Function Definitions

  // The StateAvailable function will be called when
  // self.state[<entity>] has valid information for the requested entity
  // state is the initial state
  // Methods

  function OnUpdate(self, state) {
    if (state.entity_id == weather_entity) {
      
      self.set_icon(self, "current_icon", self.weather_mdi[state.state])
      self.set_field(self, "temperature", state.attributes.temperature);
      
      self.set_field(self, "unit", "&#176;F")
      self.set_field(self, "small_unit", "&#176;F")

      if (state.attributes.forecast[0].daytime) {
        self.set_field(self, "forecast_0_title", "Today");
      } else {
        self.set_field(self, "forecast_0_title", "Tonight");
      }
      self.set_icon(self, "forecast_0_icon", self.weather_mdi[state.attributes.forecast[0].condition]);
      self.set_field(self, "forecast_0_temp", state.attributes.forecast[0].temperature);
      self.set_field(self, "forecast_0_precip", state.attributes.forecast[0].precipitation_probability);
      self.set_field(self, "forecast_0_humidity", state.attributes.humidity);
      
      if (state.attributes.forecast[1].daytime) {
        self.set_field(self, "forecast_1_title", "Tomorrow");
      } else {
        self.set_field(self, "forecast_1_title", "Tonight");
      }
      self.set_icon(self, "forecast_1_icon", self.weather_mdi[state.attributes.forecast[1].condition]);
      self.set_field(self, "forecast_1_temp", state.attributes.forecast[1].temperature);
      self.set_field(self, "forecast_1_precip", state.attributes.forecast[1].precipitation_probability);

    }
  }

}