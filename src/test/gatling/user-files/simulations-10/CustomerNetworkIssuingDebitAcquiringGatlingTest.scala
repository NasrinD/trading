import _root_.io.gatling.core.scenario.Simulation
import ch.qos.logback.classic.{Level, LoggerContext}
import io.gatling.core.Predef._
import io.gatling.http.Predef._
import org.slf4j.LoggerFactory

import scala.concurrent.duration._

/**
 * Performance test for the Customer entity.
 */
class CustomerNetworkIssuingDebitAcquiringGatlingTest extends Simulation {

    val context: LoggerContext = LoggerFactory.getILoggerFactory.asInstanceOf[LoggerContext]
    // Log all HTTP requests
    //context.getLogger("io.gatling.http").setLevel(Level.valueOf("TRACE"))
    // Log failed HTTP requests
    //context.getLogger("io.gatling.http").setLevel(Level.valueOf("DEBUG"))

    val baseURL = Option(System.getProperty("baseURL")) getOrElse """http://localhost:8080"""

    val httpConf = http
        .baseURL(baseURL)
        .inferHtmlResources()
        .acceptHeader("*/*")
        .acceptEncodingHeader("gzip, deflate")
        .acceptLanguageHeader("fr,fr-fr;q=0.8,en-us;q=0.5,en;q=0.3")
        .connectionHeader("keep-alive")
        .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:33.0) Gecko/20100101 Firefox/33.0")

    val headers_http = Map(
        "Accept" -> """application/json"""
    )

    val headers_http_authenticated = Map(
        "Accept" -> """application/json""",
        "X-XSRF-TOKEN" -> "${xsrf_token}"
    )

    val keycloakHeaders = Map(
        "Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Upgrade-Insecure-Requests" -> "1"
    )

    val scn = scenario("Test the Customer entity")
        .exec(http("First unauthenticated request")
        .get("/api/account")
        .headers(headers_http)
        .check(status.is(401))
        .check(headerRegex("Set-Cookie", "XSRF-TOKEN=(.*);[\\s]").saveAs("xsrf_token"))).exitHereIfFailed
        .pause(10)
        .exec(http("Authentication")
        .post("/api/authentication")
        .headers(headers_http_authenticated)
        .formParam("j_username", "admin")
        .formParam("j_password", "admin")
        .formParam("remember-me", "true")
        .formParam("submit", "Login")
        .check(headerRegex("Set-Cookie", "XSRF-TOKEN=(.*);[\\s]").saveAs("xsrf_token"))).exitHereIfFailed
        .pause(1)
        .exec(http("Authenticated request")
        .get("/api/account")
        .headers(headers_http_authenticated)
        .check(status.is(200)))
        .pause(10)
        .repeat(2) {
            exec(http("Get all customers")
            .get("/api/customers")
            .headers(headers_http_authenticated)
            .check(status.is(200)))
            .pause(10 seconds, 20 seconds)
						.exec(http("Get all networks")
            .get("/api/networks")
            .headers(headers_http_authenticated)
            .check(status.is(200)))
            .pause(10 seconds, 20 seconds)
            .exec(http("Create new customer")
            .post("/api/customers")
            .headers(headers_http_authenticated)
            .body(StringBody("""{"id":null, "firstName":"SAMPLE_TEXT", "lastName":"SAMPLE_TEXT", "address":"SAMPLE_TEXT"}""")).asJSON
            .check(status.is(201))
            .check(headerRegex("Location", "(.*)").saveAs("new_customer_url"))
						.check(jsonPath("$..id").find.saveAs("customer_id"))
						).exitHereIfFailed
            .exec(http("Create new network")
            .post("/api/networks")
            .headers(headers_http_authenticated)
            .body(StringBody("""{"id":null, "name":"SAMPLE_TEXT"}""")).asJSON
            .check(status.is(201))
            .check(headerRegex("Location", "(.*)").saveAs("new_network_url"))
						.check(jsonPath("$..id").find.saveAs("network_id"))
						).exitHereIfFailed
            .exec(http("Create new issuingBank")
            .post("/api/issuing-banks")
            .headers(headers_http_authenticated)
            .body(StringBody("""{"id":null, "name":"SAMPLE_TEXT", "address":"SAMPLE_TEXT", "network": {"id":"${network_id}", "name":"SAMPLE_TEXT"}}""")).asJSON
            .check(status.is(201))
            .check(headerRegex("Location", "(.*)").saveAs("new_issuingBank_url"))
						.check(jsonPath("$..id").find.saveAs("issuingbank_id"))
						).exitHereIfFailed
            .exec(http("Create new debit")
            .post("/api/debits")
            .headers(headers_http_authenticated)
            .body(StringBody("""{"id":null, "pin":"0", "cardNumber":"0", "validityDate":"2020-01-01T00:00:00.000Z", "network": {"id":"${network_id}", "name":"SAMPLE_TEXT"}, "owner": {"id":"${customer_id}", "firstName":"SAMPLE_TEXT", "lastName":"SAMPLE_TEXT", "address":"SAMPLE_TEXT"} }""")).asJSON
            .check(status.is(201))
            .check(headerRegex("Location", "(.*)").saveAs("new_debit_url"))
						.check(jsonPath("$..id").find.saveAs("debit_id"))
						).exitHereIfFailed						
            .exec(http("Create new acquiringBank")
            .post("/api/acquiring-banks")
            .headers(headers_http_authenticated)
            .body(StringBody("""{"id":null, "name":"SAMPLE_TEXT", "address":"SAMPLE_TEXT", "network": {"id":"${network_id}", "name":"SAMPLE_TEXT"}}""")).asJSON
            .check(status.is(201))
            .check(headerRegex("Location", "(.*)").saveAs("new_acquiringBank_url"))
						.check(jsonPath("$..id").find.saveAs("acquiringbank_id"))
						).exitHereIfFailed
            .pause(10)
            .repeat(5) {
                exec(http("Get created debit")
                .get("${new_debit_url}")
                .headers(headers_http_authenticated))
                .pause(10)
            }
            .exec(http("Delete created debit")
            .delete("${new_debit_url}")
            .headers(headers_http_authenticated))						
            .pause(10)
            .repeat(5) {
                exec(http("Get created acquiringBank")
                .get("${new_acquiringBank_url}")
                .headers(headers_http_authenticated))
                .pause(10)
            }
            .exec(http("Delete created acquiringBank")
            .delete("${new_acquiringBank_url}")
            .headers(headers_http_authenticated))
            .pause(10)
            .repeat(5) {
                exec(http("Get created issuingBank")
                .get("${new_issuingBank_url}")
                .headers(headers_http_authenticated))
                .pause(10)
            }
            .exec(http("Delete created issuingBank")
            .delete("${new_issuingBank_url}")
            .headers(headers_http_authenticated))						
            .pause(10)
            .repeat(5) {
                exec(http("Get created network")
                .get("${new_network_url}")
                .headers(headers_http_authenticated))
                .pause(10)
            }
            .exec(http("Delete created network")
            .delete("${new_network_url}")
            .headers(headers_http_authenticated))
            .pause(10)						
            .repeat(5) {
                exec(http("Get created customer")
                .get("${new_customer_url}")
                .headers(headers_http_authenticated))
                .pause(10)
            }
            .exec(http("Delete created customer")
            .delete("${new_customer_url}")
            .headers(headers_http_authenticated))
            .pause(10)
        }

    val users = scenario("Users").exec(scn)

    setUp(
        users.inject(rampUsers(Integer.getInteger("users", 10)) over (Integer.getInteger("ramp", 1) minutes))
    ).protocols(httpConf)
}
